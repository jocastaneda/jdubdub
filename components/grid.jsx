import Link from "next/link";
import Image from "next/image";

export const withGrid = (Component) => {
  const GridedComponent = ({ data, ...props }) => {
    if (!data || !data.length) {
      return props.contentType ? (
        <h2 className="text-xl text-center mt-14">
          No {props.contentType} found 🏜
        </h2>
      ) : null;
    }

    return (
      <div
        className={`mt-12 grid gap-5 max-w-content mx-auto lg:grid-cols-3 lg:max-w-screen-lg`}
      >
        {data.map((content, i) => {
          return <Component key={i} content={content} {...props} />;
        })}
      </div>
    );
  };

  return GridedComponent;
};

export const PostGridItem = ({ content: post }) => {
  const imgSrc = post?.featuredImage?.node.sourceUrl || "";
  const altText = post?.featuredImage?.node.altText || post.title;

  return (
    <Link passHref href={`/posts${post.uri}`}>
      <a>
        <div className="flex flex-col rounded-lg shadow-lg overflow-hidden cursor-pointer border-2 h-full hover:border-indigo-500">
          <div className="flex-shrink-0 relative h-40">
            {imgSrc !== "" ? (
              <Image
                src={imgSrc}
                layout="fill"
                objectFit="cover"
                alt={altText}
              />
            ) : (
              <Image
                src="/pantheon.png"
                alt="Pantheon Logo"
                layout="fill"
                className="bg-black"
              />
            )}
          </div>
          <h2 className="my-4 mx-6 text-xl leading-7 font-semibold text-gray-900">
            {post.title} &rarr;
          </h2>
        </div>
      </a>
    </Link>
  );
};

export const PageGridItem = ({ content: page }) => {
  const imgSrc = page?.featuredImage?.node.sourceUrl || "";
  const altText = page?.featuredImage?.node.altText || page.title;

  return (
    <Link passHref href={`/pages${page.uri}`}>
      <a>
        <div className="flex flex-col rounded-lg shadow-lg overflow-hidden cursor-pointer border-2 h-full hover:border-indigo-500">
          <div className="flex-shrink-0 relative h-40">
            {imgSrc !== "" ? (
              <Image
                src={imgSrc}
                layout="fill"
                objectFit="cover"
                alt={altText}
              />
            ) : (
              <Image
                src="/pantheon.png"
                alt="Pantheon Logo"
                layout="fill"
                className="bg-black"
              />
            )}
          </div>
          <h2 className="my-4 mx-6 text-xl leading-7 font-semibold text-gray-900">
            {page.title} &rarr;
          </h2>
        </div>
      </a>
    </Link>
  );
};
