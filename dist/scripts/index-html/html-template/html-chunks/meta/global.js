"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTML_INDEX_TEMPLATE_META_GLOBAL = void 0;
exports.HTML_INDEX_TEMPLATE_META_GLOBAL = `
<!-- specifies the path to the web application manifest file (manifest.json) -->
<link rel="manifest" href="/manifest.json">

<!-- ================== MAIN ================== -->

<!-- defines the title of the document -->
<title>{{tokens.title}}</title>

<!--
    This meta tag is used to specify the title of a web page,
    which appears in the browser's title bar and in search engine results.
-->
<meta name="title" content="{{tokens.title}}">

<!--
    This tag specifies a short description of the page (for search engine optimization (SEO) purposes)
    that may be displayed in search engine results
-->
<meta name="description" content="{{tokens.description}}">

<!-- ================== APPLE ================== -->

<!-- eslint-disable max-len -- link -->
<!--
    sets the appearance of the status bar in full-screen mode on iOS devices.
    Variants: Default / Black / black-translucent
    Read more: https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
-->
<meta name="apple-mobile-web-app-status-bar-style" content="{{tokens.appleMobileWebAppStatusBarStyle}}">
<!-- eslint-enable max-len -->

<!-- specifies the title that will be displayed when the web app is added to the home screen on iOS devices. -->
<meta name="apple-mobile-web-app-title" content="{{tokens.title}}">

<!-- This tag is used by Apple devices to specify that the webpage is optimized for full-screen viewing -->
<meta name="apple-touch-fullscreen" content="{{tokens.appleTouchFullscreen}}">

<!--
    This tag is used by Apple devices to specify whether the webpage
    can be opened in full-screen mode on iOS devices
-->
<meta name="apple-mobile-web-app-capable" content="{{tokens.appleMobileWebAppCapable}}">


<!-- ================== MICROSOFT ================== -->

<!--
    defines customizations for pinned sites and Uniform Resource Identifiers (URIs)
    to be polled for notification updates.
-->
<meta name="msapplication-config" content="/browserconfig.xml">

<!-- specifies the background color for a tile on the Windows Start screen. -->
<meta name="msapplication-TileColor" content="{{tokens.msapplicationTileColor}}">

<!-- specifies the color for the navigation bar in the Windows Edge browser. -->
<meta name="msapplication-navbutton-color" content="{{tokens.msapplicationNavbuttonColor}}">

<!-- specifies the URL to launch when the web app is pinned to the Windows Start screen. -->
<meta name="msapplication-starturl" content="{{tokens.msapplicationStarturl}}">


<!-- ================== ANDROID ================== -->

<!-- enables a web application to run in full-screen mode on Android devices. -->
<meta name="mobile-web-app-capable" content="{{tokens.mobileWebAppCapable}}">

<!-- ================== OPEN GRAPH ================== -->

<!--
    Read more about cards for social networks:

    - https://popupsmart.com/blog/auto-generate-open-graph-image
    - https://ogp.me/
-->

<!-- This meta tag is used to specify the type of content on the page. -->
<meta property="og:type" content="{{tokens.ogType}}">

<!-- This meta tag is used to specify the URL of the page that will be shared on social media platforms. -->
<meta property="og:url" content="{{tokens.ogUrl}}">

<!--
    This meta tag is used to specify the title of the page that will be displayed
    when the page is shared on social media platforms.
-->
<meta property="og:title" content="{{tokens.ogTitle}}">

<!-- This meta tag is used to specify the name of the website or application. -->
<meta property="og:site_name" content="{{tokens.ogSiteName}}">

<!--
    This meta tag is used to provide a description of the content of the page
    when shared on social media platforms.
-->
<meta property="og:description" content="{{tokens.ogDescription}}">

<!--
    This meta tag is used to provide alternative text for the image
    that is shared on social media platforms.
-->
<meta property="og:image:alt" content="{{tokens.ogImageAlt}}">

<!--
    This meta tag is used to specify the width of the image
    that will be displayed when the page is shared on social media platforms.
-->
<meta property="og:image:width" content="{{tokens.ogImageWidth}}">

<!--
    This meta tag is used to specify the height of the image
    that will be displayed when the page is shared on social media platforms.
-->
<meta property="og:image:height" content="{{tokens.ogImageHeight}}">

<!--
    This meta tag is used to specify the type of the image
    that will be displayed when the page is shared on social media platforms.
-->
<meta property="og:image:type" content="{{tokens.ogImageType}}">

<!-- This meta tag is used to specify the locale of the page. -->
<meta property="og:locale" content="{{tokens.ogLocale}}">

<!-- ================== TWITTER ================== -->

<!--
    Read more about cards for social networks:

    - https://popupsmart.com/blog/auto-generate-open-graph-image#top5toolstoauto...
    - https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started
    - https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started
-->

<!-- This tag specifies the type of Twitter card to use for the website. -->
<meta property="twitter:card" content="{{tokens.twitterCard}}">

<!-- This tag specifies the title of the webpage as it should appear when shared on Twitter. -->
<meta property="twitter:title" content="{{tokens.twitterTitle}}">

<!-- This tag specifies a brief description of the website's content for use on Twitter. -->
<meta property="twitter:description" content="{{tokens.twitterDescription}}">

<!-- This tag specifies the URL of the main image to use for Twitter sharing. -->
<meta property="twitter:image" content="{{tokens.twitterImage}}">

<!-- This tag specifies alternative text for the main Twitter image. -->
<meta property="twitter:image:alt" content="{{tokens.twitterImageAlt}}">

<!-- This tag specifies the Twitter username of the content creator. -->
<meta property="twitter:creator" content="{{tokens.twitterCreator}}">

<!-- This tag specifies the Twitter username of the website owner. -->
<meta property="twitter:site" content="{{tokens.twitterSite}}">

<!-- This tag specifies the ID of the Android app associated with the website. -->
<meta property="twitter:app:id:googleplay" content="{{tokens.twitterAppIdGoogleplay}}">

<!-- This tag specifies the ID of the iPad app associated with the website. -->
<meta property="twitter:app:id:ipad" content="{{tokens.twitterAppIdIpad}}">

<!-- This tag specifies the ID of the iPhone app associated with the website. -->
<meta property="twitter:app:id:iphone" content="{{tokens.twitterAppIdIphone}}">

<!-- This tag specifies the name of the Android app associated with the website. -->
<meta property="twitter:app:name:googleplay" content="{{tokens.twitterAppNameGoogleplay}}">

<!-- This tag specifies the name of the iPad app associated with the website. -->
<meta property="twitter:app:name:ipad" content="{{tokens.twitterAppNameIpad}}">

<!-- This tag specifies the name of the iPhone app associated with the website. -->
<meta property="twitter:app:name:iphone" content="{{tokens.twitterAppNameIphone}}">

<!-- This tag specifies the URL of the Android app associated with the website. -->
<meta property="twitter:app:url:googleplay" content="{{tokens.twitterAppUrlGoogleplay}}">

<!-- This tag specifies the URL of the iPad app associated with the website. -->
<meta property="twitter:app:url:ipad" content="{{tokens.twitterAppUrlIpad}}">

<!-- This tag specifies the URL of the iPhone app associated with the website. -->
<meta property="twitter:app:url:iphone" content="{{tokens.twitterAppUrlIphone}}">

<!-- This tag specifies the numeric ID of the content creator's Twitter account. -->
<meta property="twitter:creator:id" content="{{tokens.twitterCreatorId}}">

<!-- This tag specifies the HTTPS URL of the player iframe that Twitter can use to display media in a tweet. -->
<meta property="twitter:player" content="{{tokens.twitterPlayer}}">

<!-- This tag specifies the height of the player iframe specified in the twitter:player tag. -->
<meta property="twitter:player:height" content="{{tokens.twitterPlayerHeight}}">

<!-- This tag specifies the HTTPS URL of the raw video or audio stream to play within the Twitter app. -->
<meta property="twitter:player:stream" content="{{tokens.twitterPlayerStream}}">

<!-- This tag specifies the width of the player iframe specified in the twitter:player tag. -->
<meta property="twitter:player:width" content="{{tokens.twitterPlayerWidth}}">

<!-- This tag specifies the numeric ID of the website owner's Twitter account. -->
<meta property="twitter:site:id" content="{{tokens.twitterSiteId}}">

<!-- ================== META [other] ================== -->

<!--
    This tag specifies the character encoding used on the page,
    which is important for displaying text correctly
-->
<meta charset="utf-8">

<!--
    Sets the viewport width and initial scale for the web page,
    and disables the shrinking of the page to fit the screen.
-->
<meta name="viewport" content="{{tokens.viewport}}">

<!-- specifies the name of the web app. -->
<meta name="application-name" content="{{tokens.applicationName}}">

<!-- specifies the default color for the browser's theme. -->
<meta name="theme-color" content="{{tokens.themeColor}}">


<!-- This tag is used to provide a link to an RSS feed for the site. -->
<link rel="alternate" type="application/rss+xml" title="RSS" href="{{tokens.urlRSSFeed}}">

<!--
    This tag is used to specify the URL of an OpenSearch description document,
    which provides information about the site's search capabilities.
-->
<link rel="search" href="/search.xml" type="application/opensearchdescription+xml" title="{{tokens.linkRelSearchTitle}}" >

<!--
    This meta tag is used to disable automatic detection
    and formatting of telephone numbers by mobile devices.
    This can be useful if you don't want phone numbers
    on your website to be clickable and initiate phone calls.
-->
<meta name="format-detection" content="{{tokens.formatDetection}}">


<!-- This meta tag is used to specify the name or organization that owns the website. -->
<meta name="owner" content="{{tokens.owner}}">

<!--
    This meta tag is used to specify an email address
    that can be used for replying to the content on a web page.
-->
<meta name="reply-to" content="{{tokens.replyTo}}">

<!--
    This meta tag is used to instruct search engine crawlers
    on whether to index and follow the links on a web page.
-->
<meta name="robots" content="{{tokens.robots}}">
`;
