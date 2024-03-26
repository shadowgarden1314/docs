import Article from '../../components/Article';

// import { createMathjaxInstance, mathjax } from '@mdit/plugin-mathjax';
import yaml from 'js-yaml';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import { sup } from '@mdit/plugin-sup';
import { sub } from '@mdit/plugin-sub';
import { mark } from '@mdit/plugin-mark';
import { container } from '@mdit/plugin-container';
// import multimdTable from 'markdown-it-multimd-table';

// const mathjaxInstance = createMathjaxInstance({ output: 'chtml' });

const md = new MarkdownIt({
	html: true,
	highlight: function (str, lang) {
		let code = md.utils.escapeHtml(str);
		if (lang && hljs.getLanguage(lang)) {
			code = hljs.highlight(lang, str, true).value;
		}
		return `<pre class="hljs"><code>${code}</code></pre>`;
	}
})
	.use(sup)
	.use(sub)
	.use(mark)
	.use(container, {
		name: 'info',
		openRender: (tokens, index, _options) => {
			const info = tokens[index].info.trim().trim();
			return `<div class="custom-container info">\n<p class="custom-container-title info">${info || 'Info'}</p>\n`;
		}
	})
	.use(container, {
		name: 'tip',
		openRender: (tokens, index, _options) => {
			const info = tokens[index].info.trim().trim();
			return `<div class="custom-container tip">\n<p class="custom-container-title tip">${info || 'Tip'}</p>\n`;
		}
	})
	.use(container, {
		name: 'warning',
		openRender: (tokens, index, _options) => {
			const info = tokens[index].info.trim().trim();
			return `<div class="custom-container warning">\n<p class="custom-container-title warning">${info || 'Warning'}</p>\n`;
		}
	})
	.use(container, {
		name: 'error',
		openRender: (tokens, index, _options) => {
			const info = tokens[index].info.trim().trim();
			return `<div class="custom-container error">\n<p class="custom-container-title error">${info || 'Error'}</p>\n`;
		}
	});
// .use(mathjax, mathjaxInstance)
// .use(multimdTable, {
// 	multiline: true,
// 	rowspan: true,
// 	headerless: true,
// 	multibody: true,
// 	autolabel: true
// })

function markdownToHtml(markdown) {
	const fmRegex = /---(.*?)---/gs;

	return {
		meta: yaml.load(fmRegex.exec(markdown)[1]),
		content: md.render(markdown.replace(fmRegex, ''))
	};
}

export default async function Page(props) {
	const title = props.params.title.map(item => decodeURI(item));
	const mdPath = path.join(process.cwd(), 'docs', `${path.join(...title)}.md`);

	let mdHtml;
	try {
		const mdSource = await fs.promises.readFile(mdPath, 'utf-8');
		mdHtml = await markdownToHtml(mdSource).content;
	} catch (_) {}

	return <Article content={mdHtml} />;
}
