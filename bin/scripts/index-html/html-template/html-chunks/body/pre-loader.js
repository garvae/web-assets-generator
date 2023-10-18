"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTML_INDEX_TEMPLATE_PRE_LOADER = void 0;
exports.HTML_INDEX_TEMPLATE_PRE_LOADER = `
<!--
    This style block is placed exactly here to display the preloader
    before loading the React app and its styles.
-->
<style>
    .pre-loader-container {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99999;
        transition: opacity 0.3s linear;
    }
    .pre-loader-content {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .pre-loader-text {
        font-size: 1.5em;
        font-weight: 600;
        color: #252525;
        margin-top: 1em;
    }
    .pre-loader-spinner {
        display: inline-block;
        position: relative;
        width: 5em;
        height: 5em;
    }
    .pre-loader-spinner-section {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 4em;
        height: 4em;
        margin: 0.5em;
        border-width: 0.5em;
        border-style: solid;
        border-radius: 50%;
        animation: pre-loader-spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #252525 transparent transparent transparent;
    }
    .pre-loader-spinner-section:nth-child(1) {
        animation-delay: -0.45s;
    }
    .pre-loader-spinner-section:nth-child(2) {
        animation-delay: -0.3s;
    }
    .pre-loader-spinner-section:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes pre-loader-spinner {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .pre-loader-spinner,
    .pre-loader-text {
        opacity: 0.35;
    }

    html {
        box-sizing: border-box;
        min-height: 100%;
        font-family: system-ui, /* macOS 10.11-10.12 */ -apple-system, /* Windows 6+ */ 'Segoe UI',
            /* Android 4+ */ 'Roboto', /* Ubuntu 10.10+ */ 'Ubuntu', /* Gnome 3+ */ 'Cantarell',
            /* KDE Plasma 5+ */ 'Noto Sans', /* fallback */ sans-serif, /* macOS emoji */ 'Apple Color Emoji',
            /* Windows emoji */ 'Segoe UI Emoji', /* Windows emoji */ 'Segoe UI Symbol',
            /* Linux emoji */ 'Noto Color Emoji';
        font-size: 16px;
        font-weight: 400;
    }

    html,
    .pre-loader-container {
        background: #f5f5f5;
    }

    @media (prefers-color-scheme: dark) {
        html,
        .pre-loader-container {
            background: #000D1D;
        }
        .pre-loader-text {
            color: #E7E9EA;
        }
        .pre-loader-spinner-section {
            border-color: #E7E9EA transparent transparent transparent;
        }
    }
</style>


<!-- The App pre-loader. Rendered before the React app and its styles are loaded.  -->
<div id="app-pre-loader" class="pre-loader-container">
    <div class="pre-loader-content">
        <div class="pre-loader-spinner">
            <div class="pre-loader-spinner-section"></div>
            <div class="pre-loader-spinner-section"></div>
            <div class="pre-loader-spinner-section"></div>
            <div class="pre-loader-spinner-section"></div>
        </div>
        <div class="pre-loader-text">{{tokens.preLoaderText}}</div>
    </div>
</div>
`;
