export default interface IArticle {
	id: number;
	title: string;
	description: string;
	author: string | null;
	url: string | null;
	published_at: string | null;
	category: string | null;
	image: string | null;
	source: string | null;
}