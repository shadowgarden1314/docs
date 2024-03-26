import path from 'path';
import fs from 'fs';
// import { markdownToHtml } from '../../utils/markdownIt';
// import parseDocFile from '../../utils/parseDocFile';

// import Article from '../../components/Article';

export default async function Page(props) {
	const title = props.params.title.map(item => decodeURI(item));
	const mdPath = path.join(process.cwd(), 'docs', `${path.join(...title)}.md`);

	let md;
	try {
		md = fs.readdirSync(path.join(process.cwd(), 'docs'));
		// md = await fs.promises.readFile(mdPath, 'utf-8');
	} catch (err) {
		// md = String(err);
	}

	// const data = await parseDocFile(title);

	// return <Article content={data.content} />;

	return <h1>{mdPath}</h1>;
}
