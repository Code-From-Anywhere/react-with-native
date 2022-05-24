"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[275],{876:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return f}});var r=n(2784);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=p(n),f=a,m=d["".concat(s,".").concat(f)]||d[f]||l[f]||o;return n?r.createElement(m,c(c({ref:t},u),{},{components:n})):r.createElement(m,c({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,c=new Array(o);c[0]=d;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:a,c[1]=i;for(var p=2;p<o;p++)c[p]=n[p];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2123:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return i},metadata:function(){return p},toc:function(){return l}});var r=n(7896),a=n(1461),o=(n(2784),n(876)),c=["components"],i={},s="Creating a RWN package",p={unversionedId:"extra/creating-packages",id:"extra/creating-packages",title:"Creating a RWN package",description:"How to make css in a package that you use react-with-native in?",source:"@site/../../docs/extra/creating-packages.md",sourceDirName:"extra",slug:"/extra/creating-packages",permalink:"/extra/creating-packages",draft:!1,editUrl:"https://github.com/Code-From-Anywhere/react-with-native/tree/main/apps/docs/../../docs/extra/creating-packages.md",tags:[],version:"current",frontMatter:{},sidebar:"docSidebar",previous:{title:"Select input",permalink:"/react-with-native/select"},next:{title:"Unsupported things",permalink:"/extra/unsupported-things"}},u={},l=[{value:"How to make css in a package that you use react-with-native in?",id:"how-to-make-css-in-a-package-that-you-use-react-with-native-in",level:2}],d={toc:l};function f(e){var t=e.components,n=(0,a.Z)(e,c);return(0,o.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"creating-a-rwn-package"},"Creating a RWN package"),(0,o.kt)("h2",{id:"how-to-make-css-in-a-package-that-you-use-react-with-native-in"},"How to make css in a package that you use react-with-native in?"),(0,o.kt)("p",null,"It's important that you create a CSS file that people can import in their project if they use your package. There are a couple of steps involved to do this."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Create a ",(0,o.kt)("inlineCode",{parentName:"li"},"tailwind.config.js")," file")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},'module.exports = {\n  content: ["./src/**/*.{ts,tsx}"],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n};\n')),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"Install some devDependencies:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"yarn add -D tailwindcss tsc-watch\n")),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"Add this to your package.json scripts")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "dev": "npx tsc-watch --onSuccess \'yarn dev:tw\'",\n  "dev:tw": "tailwindcss -o css.css"\n}\n')),(0,o.kt)("p",null,"That's it!"))}f.isMDXComponent=!0}}]);