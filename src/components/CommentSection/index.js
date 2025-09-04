import { useState, useEffect } from 'react';
import axios from 'axios';
import Translate, { translate } from '@docusaurus/Translate';
import { useLocation } from 'react-router-dom';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Crepe } from "@milkdown/crepe";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";

import styles from './index.module.css';

const LOCAL_STORAGE_AUTHOR_KEY = 'sqybi_com_comment_author';
const LOCAL_STORAGE_EMAIL_KEY = 'sqybi_com_comment_email';
const LOCAL_STORAGE_WEBSITE_KEY = 'sqybi_com_comment_website';

const getLocaleDateString = (timestamp, locale) => {
    return new Date(timestamp).toLocaleString(
        locale ?? 'en-US', { dateStyle: 'long', timeStyle: 'medium' })
};

const Comment = ({ comment, depth, onReply, isReplying, locale }) => {
    const getGravatarUrl = (email, author, size = 50) => {
        const trimmedEmail = email ? email.trim().toLowerCase() : author.trim();
        // Use global script in Docusaurus settings to load CryptoJS
        const hash = CryptoJS.SHA256(trimmedEmail);
        return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=retro`;
    };

    return (
        <div className={styles['comment-box']} style={{ marginLeft: depth * 60 + 'px' }}>
            <div className={styles['comment-profile']}>
                <img src={getGravatarUrl(comment.email, comment.author)} alt="Profile Image" />
                <div className={styles['comment-profile-details']}>
                    <div className={styles['comment-profile-name']}>
                        {comment.website ? <a href={comment.website} target="_blank">{comment.author}</a> : comment.author}
                    </div>
                    <div className={styles['comment-profile-date']}>
                        {getLocaleDateString(comment.comment_timestamp_ms, locale ?? 'en-US')}
                    </div>
                </div>
                {
                    depth < 4 ?
                        <button
                            className={isReplying ? "button disabled button--secondary" : "button button--primary"}
                            onClick={() => {
                                onReply(comment.id);
                                document.getElementById('comment-reply-area').scrollIntoView({ behavior: 'smooth' });
                            }} disabled={isReplying}>
                            {isReplying ? <Translate>正在回复此评论</Translate> : <Translate>回复此评论</Translate>}
                        </button>
                        :
                        null
                }
            </div>
            <div className={styles['comment-content']} dangerouslySetInnerHTML={{ __html: comment.content }} />
        </div>
    );
};

const CrepeEditor = ({ value, onChange, placeholder }) => {
    useEffect(() => {
        // Dynamically import CSS. Imports at the beginning will not work.
        import("@milkdown/crepe/theme/common/style.css");
    }, []);

    useEditor((root) => {
        const crepe = new Crepe({
            root,
            defaultValue: value,
            features: {
                [Crepe.Feature.BlockEdit]: false,
                [Crepe.Feature.ImageBlock]: false,
            },
            featureConfigs: {
                [Crepe.Feature.Placeholder]: {
                    text: placeholder,
                },
            }
        });

        crepe.on((listener) => {
            listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
                onChange && onChange(markdown);
            });
        });

        return crepe;
    }, []);

    return (
        <>
            <Milkdown />
        </>
    );
};

const CommentSection = ({ }) => {
    const [comments, setComments] = useState([]);
    const [replyTo, setReplyTo] = useState(null);
    const [author, setAuthor] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [markdown, setMarkdown] = useState('');
    const [articleId, setArticleId] = useState('');
    const [missingAuthorWarning, setMissingAuthorWarning] = useState(false);
    const [sendButtonDisabled, setSendButtonDisabled] = useState(true);
    const [posting, setPosting] = useState(false);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const {
        siteConfig: { customFields },
        i18n: { currentLocale },
    } = useDocusaurusContext();

    useEffect(() => {
        const storedAuthor = localStorage.getItem(LOCAL_STORAGE_AUTHOR_KEY);
        if (storedAuthor) {
            setAuthor(storedAuthor);
        }
        const storedEmail = localStorage.getItem(LOCAL_STORAGE_EMAIL_KEY);
        if (storedEmail) {
            setEmail(storedEmail);
        }
        const storedWebsite = localStorage.getItem(LOCAL_STORAGE_WEBSITE_KEY);
        if (storedWebsite) {
            setWebsite(storedWebsite);
        }
    }, []);

    useEffect(() => {
        const article_id = location.pathname.split('/').filter(Boolean).pop();
        setArticleId(article_id);
    }, [location.pathname]);

    useEffect(() => {
        fetchComments().then();
    }, [articleId]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_AUTHOR_KEY, author);
        setMissingAuthorWarning(!author)
    }, [author]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_EMAIL_KEY, email);
    }, [email]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_WEBSITE_KEY, website);
    }, [website]);

    useEffect(() => {
        setSendButtonDisabled(!author || !markdown);
    }, [author, markdown]);

    useEffect(() => {
        setLoading(false);
    }, [comments]);

    const fetchComments = async () => {
        if (loading) {
            console.warn('Loading comments while previous request is still pending.');
        }
        try {
            setLoading(true);
            axios.get(customFields.commentServiceUrl, {
                params: {
                    comment_base_type: 'article',
                    comment_base_id: articleId,
                    is_recursive: true,
                }
            }).then(response => {
                setComments(sortAndNestComments(response.data));
            });
        } catch (error) {
            setLoading(false);
            console.error('Error fetching comments:', error);
        }
    }

    const sortAndNestComments = (rawComments, depth = 0) => {
        const sortedComments = rawComments.sort((a, b) => a.comment_timestamp_ms - b.comment_timestamp_ms);
        const nestedComments = [];

        for (const comment of sortedComments) {
            fixCommentWebsiteLink(comment);

            comment.depth = depth;
            nestedComments.push(comment);
            const childrenComments = sortAndNestComments(comment.children, depth + 1);
            nestedComments.push(...childrenComments);
        }

        return nestedComments;
    };

    const fixCommentWebsiteLink = (comment) => {
        if (!comment.website) return;
        if (comment.website.startsWith('http://') && comment.website.startsWith('https://')) return;
        if (comment.website.includes("://")) {
            comment.website = comment.website.split("://")[1];
        }
        comment.website = "http://" + comment.website;
    }

    const handlePostComment = async () => {
        try {
            setPosting(true);
            if (!author || !markdown) {
                setMissingAuthorWarning(!author);
                setSendButtonDisabled(!author || !markdown);
                return;
            }
            const newComment = {
                article_id: articleId,
                article_original_url: window.location.href,
                parent_comment_id: replyTo ? replyTo.id : undefined,
                author,
                email,
                website,
                content: markdown,
            };
            await axios.post(customFields.commentServiceUrl, newComment);
            fetchComments();
            setMarkdown('');
            setReplyTo(null);
            setSendButtonDisabled(true);
        } catch (error) {
            console.error('Error posting comment:', error);
        } finally {
            setPosting(false);
        }
    };

    return (
        <div>
            <hr className={styles['comment-divider']} />
            <div className={styles['comment-list']}>
                {comments.map(comment => (
                    <Comment key={comment.id} comment={comment} depth={comment.depth} locale={currentLocale} onReply={(e) => setReplyTo(comment)} isReplying={replyTo === comment} />
                ))}
            </div>
            <div className={styles['comment-loading-container']}>
                <div className={loading ? styles['comment-loading'] : ''}></div>
            </div>
            <div id='comment-reply-area' className={styles["comment-input"]}>
                <h3>{replyTo ? <Translate>回复评论</Translate> : <Translate>发表评论</Translate>}</h3>
                <input
                    type="text"
                    placeholder={translate({ message: "昵称（必需）" })}
                    className={missingAuthorWarning ? styles['comment-author-warning'] : ''}
                    value={author}
                    onChange={(e) => {
                        setAuthor(e.target.value);
                    }}
                />
                <input
                    type="email"
                    placeholder={translate({ message: "邮件地址" })}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="url"
                    placeholder={translate({ message: "个人主页" })}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />

                <MilkdownProvider>
                    <CrepeEditor
                        value={markdown}
                        onChange={setMarkdown}
                        placeholder={translate({ message: "不如先试着发一次评论看看 :D" })}
                    />
                </MilkdownProvider>

                <button
                    className={posting ? "button button--primary button--block " + styles['comment-posting'] : "button button--primary button--block"}
                    onClick={handlePostComment}
                    disabled={sendButtonDisabled || posting}>
                    {replyTo ? <Translate>发表回复</Translate> : <Translate>发表评论</Translate>}
                </button>
                {replyTo &&
                    <button
                        className={"button button--secondary button--block " + styles['comment-cancel-reply']}
                        onClick={() => setReplyTo(null)}>
                        <Translate>取消回复评论</Translate><br />
                        <span className={styles['info-text']}>{replyTo.author} @ {getLocaleDateString(replyTo.comment_timestamp_ms, currentLocale)}</span>
                    </button>
                }
            </div>
        </div >
    );
};

export default CommentSection;