import React from "react";
import moment from "moment";
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from "next-share";
import Link from "next/link";

const PostDetail = ({ post }: { post: any }) => {
  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = <b key={index}>{text}</b>;
      }

      if (obj.italic) {
        modifiedText = <em key={index}>{text}</em>;
      }

      if (obj.underline) {
        modifiedText = <u key={index}>{text}</u>;
      }

      if (obj.code) {
        modifiedText = <code key={index}>{text}</code>;
      }

      if (obj.strikethrough) {
        modifiedText = <del key={index}>{text}</del>;
      }

      if (type === "link") {
        modifiedText = (
          <a
            href={obj.href}
            key={index}
            target="_blank"
            className="text-fuchsia-700"
          >
            {obj.children[0].text}
          </a>
        );
      }
    }

    switch (type) {
      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h3>
        );
      case "paragraph":
        return (
          <p key={index} className="mb-8">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </p>
        );
      case "heading-four":
        return (
          <h4 key={index} className="text-md font-semibold mb-4">
            {modifiedText.map((item, i) => (
              <React.Fragment key={i}>{item}</React.Fragment>
            ))}
          </h4>
        );
      case "image":
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
      <div className="relative overflow-hidden shadow-md mb-6">
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className="w-full object-top h-full rounded-t-lg"
        />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
            <img
              alt={post.author.name}
              src={post.author.photo.url}
              className="align-middle rounded-full"
              width="30px"
              height="30px"
            />
            <p className="inline align-middle text-gray-700 ml-2 text-lg">
              {post.author.name}
            </p>
          </div>
          <div className="flex font-medium text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline mr-2 text-fuchsia-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>{moment(post.createdAt).format("MMM DD, YYYY")}</span>
          </div>
        </div>
        <h1 className="mb-8 text-3xl font-semibold">{post.title}</h1>
        {post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemIndex) =>
            getContentFragment(itemIndex, item.text, item, item.type)
          );

          return getContentFragment(index, children, typeObj, typeObj.type);
        })}
      </div>
      <hr className="pb-2" />
      <div className="px-4 lg:px-0 text-center">
        <p className="pb-4 text-gray-500">Share</p>
        <FacebookShareButton
          url={`modermindset.ca/post/${post.slug}`}
          quote={post.title}
          hashtag={"#themodernmindset"}
        >
          <FacebookIcon size={32} round className="mr-4" />
        </FacebookShareButton>
        <PinterestShareButton
          url={`modermindset.ca/post/${post.slug}`}
          media={post.title}
        >
          <PinterestIcon size={32} round className="mr-4" />
        </PinterestShareButton>
        <RedditShareButton
          url={`modermindset.ca/post/${post.slug}`}
          title={post.title}
        >
          <RedditIcon size={32} round className="mr-4" />
        </RedditShareButton>
        <TwitterShareButton
          url={`modermindset.ca/post/${post.slug}`}
          title={post.title}
        >
          <TwitterIcon size={32} round className="mr-4" />
        </TwitterShareButton>
        <LinkedinShareButton url={`modermindset.ca/post/${post.slug}`}>
          <LinkedinIcon size={32} round className="mr-4" />
        </LinkedinShareButton>
        <EmailShareButton
          url={`modermindset.ca/post/${post.slug}`}
          subject={post.title}
          body="Link to article -> "
        >
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default PostDetail;
