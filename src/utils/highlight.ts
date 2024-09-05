import hljs from 'highlight.js/lib/common';

import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import kotlin from 'highlight.js/lib/languages/kotlin'
import latex from 'highlight.js/lib/languages/latex'
import less from 'highlight.js/lib/languages/less'
import lua from 'highlight.js/lib/languages/lua'
import python from 'highlight.js/lib/languages/python'
import protobuf from 'highlight.js/lib/languages/protobuf'
import makefile from 'highlight.js/lib/languages/makefile'
import nginx from 'highlight.js/lib/languages/nginx'


hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('kotlin', kotlin);
hljs.registerLanguage('latex', latex);
hljs.registerLanguage('less', less);
hljs.registerLanguage('lua', lua);
hljs.registerLanguage('makefile', makefile);
hljs.registerLanguage('nginx', nginx);
hljs.registerLanguage('protobuf', protobuf);
hljs.registerLanguage('python', python);


export const highlight = hljs;
