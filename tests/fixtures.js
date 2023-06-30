const a = `
<article class="BlogPost BlogPost--listing" itemscope itemtype="http://schema.org/BlogPosting">
  <a class="BlogPost-permalink" href="/2015/12/14/svg-icons-are-easy-but-the-fallbacks-arent.html" rel="bookmark" itemprop="url">

    <h2 class="BlogPost-title" itemprop="name">
      SVG icons are easy but the fallbacks aren't
    </h2>

    <div class="BlogPost-meta">
      <time class="BlogPost-metaDate" datetime="2015-12-14" itemprop="datePublished">
        14 December 2015
      </time>
    </div>

    <p class="BlogPost-excerpt">
      Use of the icon font is in decline. Recently it’s been argued that there are many good reasons to think about not using them and switch to using SVG images instead. At the Financial Times we must provision proper fallbacks for much of the 4% of browsers that don't support SVG. As it turns out, that's hard. <span class="BlogPost-readMore">Read more</span>
    </p>
  </a>
</article>
`

const b = `
<article class="BlogPost BlogPost--listing" itemtype="http://schema.org/BlogPosting" itemscope>
  <a href="/2015/12/14/svg-icons-are-easy-but-the-fallbacks-arent.html" class="BlogPost-permalink" rel="bookmark" itemprop="url">

    <h2 class="BlogPost-title" itemprop="name">SVG icons are easy but the fallbacks aren't</h2>

    <div class="BlogPost-meta">
      <time datetime="2015-12-14" class="BlogPost-metaDate" itemprop="datePublished">14 December 2015</time>
    </div>

    <p class="BlogPost-excerpt">
      Use of the icon font is in decline. Recently it’s been argued that there are many good reasons to think about not using them and switch to using SVG images instead. At the Financial Times we must provision proper fallbacks for much of the 4% of browsers that don't support SVG. As it turns out, that's hard. <span class="BlogPost-readMore">Read more</span>
    </p>
  </a>
</article>
`

const c = `
<article class="BlogPost BlogPost--listing" itemscope itemtype="http://schema.org/BlogPosting">
  <a class="BlogPost-permalink" href="/2015/12/14/svg-icons-are-easy-but-the-fallbacks-arent.html" rel="bookmark" itemprop="url">

    <h2 class="BlogPost-title" itemprop="name">
      SVG icons are easy but the fallbacks aren't
    </h2>

    <div class="BlogPost-meta">
      <time class="BlogPost-metaDate" datetime="2015-12-14" itemprop="datePublished">
        14 December 2015
      </time>
    </div>

    <p class="BlogPost-excerpt BlogPost-sabotaged">
      Use of the icon font is in decline. Recently it’s been argued that there are many good reasons to think about not using them and switch to using SVG images instead. At the Financial Times we must provision proper fallbacks for much of the 4% of browsers that don't support SVG. As it turns out, that's hard. <span class="BlogPost-readMore">Read more</span>
    </p>
  </a>
</article>
`

const d = `
<!--This is the same as article c, but with comments-->
<article class="BlogPost BlogPost--listing" itemscope itemtype="http://schema.org/BlogPosting">
  <a class="BlogPost-permalink" href="/2015/12/14/svg-icons-are-easy-but-the-fallbacks-arent.html" rel="bookmark" itemprop="url">
<!--
A comment

spanning

multiple lines
with HTML!
<div></div>


-->
    
    <h2 class="BlogPost-title" itemprop="name">
      SVG icons are easy<!--Comment in content!--> but the fallbacks aren't
    </h2>

    <div class="BlogPost-meta">
      <time class="BlogPost-metaDate" datetime="2015-12-14" itemprop="datePublished">
        14 December 2015
      </time>
    </div>

    <p class="BlogPost-excerpt BlogPost-sabotaged">
      Use of the icon font is in decline.<!--Comment--> Recently<!--comment--><!--comment--> it’s been argued that there are many good reasons to think about not using them and switch to using SVG images instead. At the Financial Times we must provision proper fallbacks for much of the 4% of browsers that don't support SVG. As it turns out, that's hard. <span class="BlogPost-readMore">Read more</span>
    </p>
  </a>
</article>
`

module.exports = { a, b, c, d }
