"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSearchXml = void 0;
const generateSearchXml = (props) => {
    const { name, siteUrl, } = props;
    return `
<?xml version="1.0" encoding="UTF-8"?>

<!--
    The OpenSearch description document provides information about the search capabilities of a website.
    The document specifies the name and description of the search engine,
    as well as two URLs for performing searches.
    One URL is for RSS formatted search results, while the other is for HTML-formatted results.
    The document also includes an icon for the search engine, tags to help users find it,
    and an example query to show users how to perform a search.
 -->
<OpenSearchDescription
    xmlns="http://a9.com/-/spec/opensearch/1.1/"
    xmlns:moz="http://www.mozilla.org/2006/browser/search/"
>
    <Description>Search the content of ${name}</Description>
    <Image height="16" width="16" type="image/x-icon">${siteUrl}/favicon.ico</Image>
    <InputEncoding>[UTF-8]</InputEncoding>
    <ShortName>${name} Search</ShortName>
    <Url type="application/opensearchdescription+xml" template="${siteUrl}/search?search={searchTerms}&amp;format=rss"/>
    <Url type="text/html" template="${siteUrl}/search?q={searchTerms}"/>
    <moz:SearchForm>${siteUrl}/search?q={searchTerms}</moz:SearchForm>
</OpenSearchDescription>
`;
};
exports.generateSearchXml = generateSearchXml;
