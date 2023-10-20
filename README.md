# WEB assets generator

Generate **all HTML meta tags**, **favicon bundle** and **other assets** for your web project. Simple. **With just one tool**.

<br/>

<hr/>

## ✨ What can be generated?

### Common WEB files

✔️ index.html with (almost) all [HTML \<meta> Tags][w3s-meta] <br/>
✔️ [Favicon](https://www.seoptimer.com/blog/what-is-a-favicon/) bundle <br/>
✔️ LICENCE <br/>
✔️ [browserconfig.xml](https://www.computer-dictionary-online.org/definitions-b/browserconfig-xml.html) <br/>
✔️ [manifest.json](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json) <br/>
✔️ [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro) <br/>
✔️ [search.xml](https://developer.mozilla.org/en-US/docs/Web/OpenSearch#opensearch_description_file) <br/>
✔️ [site.webmanifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) <br/>

### Frameworks files

✔️ [.eslintignore](https://eslint.org/docs/latest/use/configure/ignore#the-eslintignore-file) <br/>
✔️ [.prettierignore](https://prettier.io/docs/en/ignore.html#ignoring-files-prettierignore) <br/>

<br/>

> [**web-assets-generator**][repo] can generate different files and meta tags. 
> Keeping all the settings up to date is quite difficult,
> so if you find a bug, please open an [issue] or make a [pull request][pr] 🙏


<br/>

## 💪 Motivation

Developers and SEO specialists often need to deal with the description of [HTML \<meta> Tags][w3s-meta] 
and the generation of favicon image bundles. 
It is convenient when **all these tasks are solved by one simple tool**.
This is why the [**web-assets-generator**][repo] was created.
This tool collects all (or almost all) relevant [HTML \<meta> Tags][w3s-meta],
and also generates the most complete bundle of favicon-images 
using 2 great tools under the hood ([realfavicongenerator] & [pwa-asset-generator]),
as well as some custom solutions.
As a result, the user receives a generated bundle of the main files used in web projects.

<br/>

## 🚀 Usage

1. Create a config file for the [web-assets-generator][repo]. 
 
> The file should have `.json` extension and its name should be `wag.config.json` by default.
> If you want to name the config file differently, then you need to specify your file in the `СLI` command

Since the [web-assets-generator][repo] tool can generate different combinations of assets,
you need to specify at least one generated asset in the config.
More details about the config are described in the section (TODO: SECTION).
But one of the simplest options is below:

`wag.config.json`
```json
{
  "assets": {
    "favicon": {
      "input": "./temp-images/input-favicon.png"
    }
  }
}
```

> The above config will only generate a favicon bundle.
> The `input` parameter specifies the path to the source file from which the remaining images will be generated

2. Run [**npx**][npx]-command:

If you want to confirm installation of the [web-assets-generator][repo] manually:

```shell
npx @garvae/web-assets-generator
```

If you want the installation to happen automatically:

```shell
npx --yes @garvae/web-assets-generator
```

If you want to specify the path to your config file:

```shell
npx --yes @garvae/web-assets-generator ./any-folder/config.json
```

3. Wait patiently for assets generation to complete. The generated files will be located in the path specified in the config or in the default `./web-assets-generator` directory.


<br/>

## 💎 Demo

1. Download [demo pack](https://github.com/garvae/web-assets-generator/blob/master/demo/demo.zip?raw=true) and extract it
2. Open the console and go to the directory with the files from the `demo pack`
3. Follow the instructions for steps #2 and #3 from the 🚀 [**Usage**](https://github.com/garvae/web-assets-generator/tree/master#-usage) section above.

<br/>

## 🛠 Config

### Complete config structure and values types

To begin with, I will show you the full version of the config without any comments or explanations,
just types of values.
After this there will be a detailed description of all config parameters.

```json
{
  "assets": {
    "browserConfig": "boolean",
    "favicon": { "input": "string" },
    "framework": {
      "eslintignore": "boolean",
      "prettierignore": "boolean"
    },
    "indexHtml": {
      "metaCoverSocials": "string",
      "preLoader": "boolean",
      "tokensMeta": {
        "appleMobileWebAppCapable": "string",
        "appleMobileWebAppStatusBarStyle": "string",
        "appleTouchFullscreen": "string",
        "applicationName": "string",
        "description": "string",
        "formatDetection": "string",
        "htmlLang": "string",
        "linkRelSearchTitle": "string",
        "maskIcon": "string",
        "mobileWebAppCapable": "string",
        "msapplicationNavbuttonColor": "string",
        "msapplicationStarturl": "string",
        "msapplicationTileColor": "string",
        "ogDescription": "string",
        "ogImageAlt": "string",
        "ogImageHeight": "string",
        "ogImageType": "string",
        "ogImageWidth": "string",
        "ogLocale": "string",
        "ogSiteName": "string",
        "ogTitle": "string",
        "ogType": "string",
        "ogUrl": "string",
        "owner": "string",
        "replyTo": "string",
        "robots": "string",
        "themeColor": "string",
        "title": "string",
        "twitterAppIdGoogleplay": "string",
        "twitterAppIdIpad": "string",
        "twitterAppIdIphone": "string",
        "twitterAppNameGoogleplay": "string",
        "twitterAppNameIpad": "string",
        "twitterAppNameIphone": "string",
        "twitterAppUrlGoogleplay": "string",
        "twitterAppUrlIpad": "string",
        "twitterAppUrlIphone": "string",
        "twitterCard": "string",
        "twitterCreator": "string",
        "twitterCreatorId": "string",
        "twitterDescription": "string",
        "twitterImage": "string",
        "twitterImageAlt": "string",
        "twitterPlayer": "string",
        "twitterPlayerHeight": "string",
        "twitterPlayerStream": "string",
        "twitterPlayerWidth": "string",
        "twitterSite": "string",
        "twitterSiteId": "string",
        "twitterTitle": "string",
        "urlRSSFeed": "string",
        "viewport": "string"
      }
    },
    "license": "boolean",
    "manifest": "boolean",
    "robots": "boolean",
    "searchXml": "boolean"
  },
  "outputDir": "string",
  "tokensMain": {
    "appPlaceholderBackgroundColor": "string",
    "author": "string",
    "authorAccountTwitter": "string",
    "authorEmail": "string",
    "authorUrl": "string",
    "description": "string",
    "language": "string",
    "msapplicationTileColor": "string",
    "name": "string",
    "siteUrl": "string",
    "startUrl": "string",
    "themeColor": "string",
    "title": "string"
  }
}
```

<br/>

### Config parameters with descriptions and default values


```text
{
  "assets": { // Main assets parameters
    "browserConfig": false, // Should the "browserconfig.xml" file be generated
    "favicon": { // Favicon parameters
      "input": "" // Path to your favicon source file
    },
    "framework": { // Frameworks assets
      "eslintignore": false, // Should the ".eslintignore" file be generated
      "prettierignore": false // Should the ".prettierignore" file be generated
    },
    "indexHtml": { // HTML parameters
      "metaCoverSocials": "", // Source file path for various social media tags using images
      "preLoader": false, // Do you want to include a simple "pre-loader" into generated "index.html"
      "tokensMeta": { // HTML meta tags
        "appleMobileWebAppCapable": "", // Used by Apple devices to specify whether the webpage can be opened in full-screen mode on iOS devices
        "appleMobileWebAppStatusBarStyle": "", // The appearance of the status bar in full-screen mode on iOS devices. Variants: Default / Black / black-translucent Read more: https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
        "appleTouchFullscreen": "", // Used by Apple devices to specify that the webpage is optimized for full-screen viewing
        "applicationName": "", // The name of the web app.
        "description": "", // A short description of the page (for search engine optimization (SEO) purposes) that may be displayed in search engine results
        "formatDetection": "", // Disable automatic detection and formatting of telephone numbers by mobile devices. This can be useful if you don't want phone numbers on your website to be clickable and initiate phone calls.
        "htmlLang": "en-US", // The language of the element's content.
        "linkRelSearchTitle": "", // This tag is used to specify the URL of an OpenSearch description document, which provides information about the site's search capabilities.
        "mobileWebAppCapable": "", // Enables a web application to run in full-screen mode on Android devices.
        "msapplicationNavbuttonColor": "", // The color for the navigation bar in the Windows Edge browser.
        "msapplicationStarturl": "", // The URL to launch when the web app is pinned to the Windows Start screen.
        "msapplicationTileColor": "", // The background color for a tile on the Windows Start screen.
        "ogDescription": "", // Provides a description of the content of the page when shared on social media platforms.
        "ogImageAlt": "", // Provides alternative text for the image that is shared on social media platforms.
        "ogImageHeight": "", // The height of the image that will be displayed when the page is shared on social media platforms.
        "ogImageType": "", // The type of the image that will be displayed when the page is shared on social media platforms.
        "ogImageWidth": "", // The width of the image that will be displayed when the page is shared on social media platforms.
        "ogLocale": "", // The locale of the page.
        "ogSiteName": "", // The name of the website or application.
        "ogTitle": "", // The title of the page that will be displayed when the page is shared on social media platforms.
        "ogType": "", // The type of content on the page.
        "ogUrl": "", // The URL of the page that will be shared on social media platforms.
        "owner": "", // The name or organization that owns the website.
        "replyTo": "", // An email address that can be used for replying to the content on a web page.
        "robots": "", // Instructs search engine crawlers on whether to index and follow the links on a web page.
        "themeColor": "", // The default color for the browser's theme.
        "title": "", // The title that will be displayed when the web app is added to the home screen on iOS devices.
        "twitterAppIdGoogleplay": "", // The ID of the Android app associated with the website.
        "twitterAppIdIpad": "", // The ID of the iPad app associated with the website.
        "twitterAppIdIphone": "", // The ID of the iPhone app associated with the website.
        "twitterAppNameGoogleplay": "", // The name of the Android app associated with the website.
        "twitterAppNameIpad": "", // The name of the iPad app associated with the website.
        "twitterAppNameIphone": "", // The name of the iPhone app associated with the website.
        "twitterAppUrlGoogleplay": "", // The URL of the Android app associated with the website.
        "twitterAppUrlIpad": "", // The URL of the iPad app associated with the website.
        "twitterAppUrlIphone": "", // The URL of the iPhone app associated with the website.
        "twitterCard": "", // The type of Twitter card to use for the website.
        "twitterCreator": "", // The Twitter username of the content creator.
        "twitterCreatorId": "", // The numeric ID of the content creator's Twitter account.
        "twitterDescription": "", // Specifies a brief description of the website's content for use on Twitter.
        "twitterImage": "", // The URL of the main image to use for Twitter sharing.
        "twitterImageAlt": "", // Specifies alternative text for the main Twitter image.
        "twitterPlayer": "", // The HTTPS URL of the player iframe that Twitter can use to display media in a tweet.
        "twitterPlayerHeight": "", // The height of the player iframe specified in the twitter:player tag.
        "twitterPlayerStream": "", // The HTTPS URL of the raw video or audio stream to play within the Twitter app.
        "twitterPlayerWidth": "", // The width of the player iframe specified in the twitter:player tag.
        "twitterSite": "", // The Twitter username of the website owner.
        "twitterSiteId": "", // The numeric ID of the website owner's Twitter account.
        "twitterTitle": "", // The title of the webpage as it should appear when shared on Twitter.
        "urlRSSFeed": "", // This tag is used to provide a link to an RSS feed for the site.
        "viewport": "" // The viewport width and initial scale for the web page, and disables the shrinking of the page to fit the screen
      }
    },
    "license": false, // Should the "LICENCE" file be generated
    "manifest": false, // Should the "manifest.json" file be generated
    "robots": false, // Should the "robots.txt" file be generated
    "searchXml": false // Should the "search.xml" file be generated
  },
  "outputDir": "web-assets-generator", // web-assets-generator output directory
  "tokensMain": { // Common tokens used in different web-assets-generator functions
    "appPlaceholderBackgroundColor": "", // Defines a placeholder background color for the application page to display before its stylesheet is loaded
    "author": "", // Project author name
    "authorAccountTwitter": "", // Project author twitter account
    "authorEmail": "", // Project author e-mail
    "authorUrl": "", // Project author contact web-page
    "description": "", // Project description
    "language": "en-US", // A language tag specifying the primary language of the manifest's values
    "msapplicationTileColor": "", // The background color for a tile on the Windows Start screen
    "name": "", // Project name
    "siteUrl": "", // Project url
    "startUrl": "", // Represents the start URL of the web application — the preferred URL that should be loaded when the user launches the web application (e.g., when the user taps on the web application's icon from a device's application menu or homescreen)
    "themeColor": "", // App preferred theme color
    "title": "" // App title
  }
}
```

<br/>

## 📄 HTML meta tags

[web-assets-generator][repo] generates all (or almost all) [HTML meta tags][w3s-meta] for your web projects.

For your convenience, you can find descriptions of meta tags in the comments in the `index.html` file.

At this point, you can define values for meta tags in the `wag.config.json` config.
Regardless of the presence of values in the config, all meta tags in the `index.html` file will be generated.
However, those meta tags for which values will not be passed will be commented out.

<br/>

## 📦 Favicon bundle

[web-assets-generator][repo] generates the most complete bundle of favicon-images
using 2 great tools under the hood ([realfavicongenerator] & [pwa-asset-generator]).

At the moment, [web-assets-generator][repo] does not provide the ability to customize the settings of these tools, however, this may be implemented in the future.

There is a lot of information on the topic of favicons on the Internet,
but collecting all this information into a single standardized document is quite difficult.
However, [web-assets-generator][repo] collects the most optimal (in the opinion of the author)
bundle of favicon images and immediately inserts the corresponding tags into the index.html.
If you think that some favicons are unnecessary, or incorrect,
or there is not enough of them, and I will be glad to see your [issues][issue] or [pull requests][pr] 🙏.

<br/>

## ✨ Future plans

✨️ Excluding meta tags not passed in the config <br/>
✨️ Receiving reviews from SEO specialists and improving generated meta tags <br/>
✨️ Customizable `index.html` minifier <br/>
✨️ Config for the [realfavicongenerator] <br/>
✨️ Config for the [pwa-asset-generator] <br/>
✨️ More files for frameworks <br/>

<br/>

## 🤝 Contributions

🤝 Contributions, issues and feature requests are welcome! <br/>
Feel free to check [issues page][issue] and [pull request page][pr].

❤️ **Give a** ⭐ **if you like this project!**

<br/>

## 📞 Contact me

### 🌐 [Contact page][garvae]

### 🔳 QR code

<div style="background-color: white; display: inline-block; margin-top: 2em; margin-bottom: 2em">
    <img src="https://github.com/garvae/assets/blob/master/assets/img/garvae-contacts.png?raw=true" alt="contact me" width="300px" height="300px">
</div>

### 🔗 Links

- [**E-mail**][email]
- [**Telegram**][telegram]
- [**Facebook**][facebook]
- [**Instagram**][instagram]
- [**LinkedIn**][linkedin]
- [**GitHub**][github]

<br/>

## 🚀 Mentoring

**If you want to grow** 🚀 **fast in front-end development - [contact me!][garvae]**  🙋‍♂

<br/>

## 📄 License

[See license in the "**LICENCE**" file][license]

[//]: # (------------------------------------------------------------------)
[//]: # (------------------------- Document links -------------------------)
[//]: # (------------------------------------------------------------------)

[//]: # (--------------------------- repo links ---------------------------)

[npx]:https://www.geeksforgeeks.org/what-are-the-differences-between-npm-and-npx/
[pwa-asset-generator]:https://github.com/elegantapp/pwa-asset-generator
[realfavicongenerator]:https://realfavicongenerator.net/
[w3s-meta]:https://www.w3schools.com/tags/tag_meta.asp


[//]: # (-------------------------- common links --------------------------)

[issue]:https://github.com/garvae/web-assets-generator/issues
[pr]:https://github.com/garvae/web-assets-generator/pulls
[repo]:https://github.com/garvae/web-assets-generator
[license]:https://github.com/garvae/web-assets-generator/blob/master/LICENSE?raw=true

[//]: # (---------------------------- contacts ----------------------------)

[garvae]:https://sprd.li/4wr38watys
[email]:vgarvae@gmail.com
[telegram]:https://t.me/garvae
[facebook]:https://www.facebook.com/garvae
[instagram]:https://www.instagram.com/garvae
[linkedin]:https://linkedin.com/in/garvae
[github]:https://github.com/garvae

[//]: # (------------------------------------------------------------------)
[//]: # (------------------------------------------------------------------)
