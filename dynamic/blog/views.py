from django.shortcuts import render, get_object_or_404
from django.http import Http404

from blog.models import Article

def index(request, page = 1):
    articles = Article.objects.filter(is_shown = True).order_by("id")[::-1]

    start_article = (page - 1) * 5;
    end_article = page * 5;

    context = {
        "articles": list(articles),
        "selected_articles": list(articles)[start_article:end_article],
    }

    return render(request, "blog/index.htm", context)

def article(request, article_id = None, article_slug = None):
    articles = Article.objects.filter(is_shown = True).order_by("id")[::-1]

    if article_id != None:
        article = get_object_or_404(Article, id = article_id)
    elif article_slug != None:
        article = get_object_or_404(Article, slug = article_slug)
    else:
        raise Http404

    context = {
        "articles": list(articles),
        "article": article,
    }

    return render(request, "blog/article.htm", context)

