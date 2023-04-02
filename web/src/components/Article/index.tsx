import React, { ButtonHTMLAttributes, useCallback } from "react";

import generic from "assets/logo.svg";
import { IoArrowRedo } from "react-icons/io5";

import IArticle from "interfaces/entities/IArticle";

import {
	Author,
	AuthorInfo,
	AuthorName,
	Banner,
	ButtonSeeMore,
	Container,
	Content,
	Footer,
	ImgBox,
	PublishDate,
	SeeMore,
	Text,
	Title,
} from "./styles";

interface IProps {
	article: IArticle;
}
const LIMIT_CHARACTERS_TO_SHOW_ON_RESUMED_DESCRIPTION = 230;

const Article: React.FC<IProps> = ({ article, ...rest }) => {
	const firstLetterUppercase = useCallback((str: string) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}, []);

	const fixingSizeDescription = useCallback(
		(description: string) => {
			if (
				description.length <=
				LIMIT_CHARACTERS_TO_SHOW_ON_RESUMED_DESCRIPTION
			) {
				return description;
			}

			let reduced = description.slice(
				0,
				LIMIT_CHARACTERS_TO_SHOW_ON_RESUMED_DESCRIPTION
			);
			let lastOccurrence = reduced.lastIndexOf(" ");
			let result = reduced.substring(0, lastOccurrence);

			return result + "...";
		},
		[LIMIT_CHARACTERS_TO_SHOW_ON_RESUMED_DESCRIPTION]
	);

	return (
		<Container>
			<ImgBox>
				<Banner src={article.image ?? generic} />
			</ImgBox>
			<Content>
				<a href='##'>
					<Title>{article.title}</Title>
				</a>
				<Text>{fixingSizeDescription(article.description)}</Text>

				<Footer>
					<Author>
						<div>
							<a href='##'>
								<AuthorInfo>
									{firstLetterUppercase(
										article.category ?? ""
									)}
									- {article.source}
									<br />
									<AuthorName>
										{article.author ?? "Unknown"}
									</AuthorName>
								</AuthorInfo>
							</a>

							<PublishDate>
								{article.published_at ?? "Unknown"}
							</PublishDate>
						</div>
					</Author>
					<SeeMore>
						<ButtonSeeMore
							target='_blank'
							href={article.url ?? "#"}>
							<IoArrowRedo />
						</ButtonSeeMore>
					</SeeMore>
				</Footer>
			</Content>
		</Container>
	);
};

export default Article;
