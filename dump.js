import {ptk_version,glob,meta_cbeta,nodefs,writeChanged,parseXMLAttribute,peelXML,readTextContent, readTextLines } from 'ptk/nodebundle.cjs'; //ptk/pali
import {  existsSync } from 'fs';
import {fetchWikisource} from './mediawiki.js';

await nodefs;
let fn='',content='';
const dump=async (lines)=>{
    for (let i=0;i<lines.length;i++) {
        const line=lines[i];
        if (line[0]=='#') {
            fn&&writeChanged(fn,content,true);
            content='';
            fn=line.slice(1);
        } else {
            process.stdout.write('\r '+line+'   ')
            content+=await fetchWikisource(line);
        }
    }
    writeChanged(fn,content,true);
}

const lines=readTextLines(process.argv[2]||'yj.lst');
//const lines=['#yj.off','周易/恆'];
dump(lines);

