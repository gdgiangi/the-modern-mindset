import type { NextPage } from "next";
import Head from "next/head";
import { PostWidget, PostCard, Categories } from "../components";
import { getPosts } from "../services";
import { FeaturedPosts } from "../sections";

const Home: NextPage = ({ posts }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <title>The Modern Mindset</title>
        <link rel="icon" href="/fav.png" />
        <meta name="robots" content="all" />
        <meta
          name="description"
          content="The Modern Mindset is a men's lifestyle and personal growth blog that offers practical advice, tips, and inspiration for living a fulfilling and successful life."
        />
        <meta property="og:title" content="The Modern Mindset" />
        <meta property="og:image" content="/social.avif" />
      </Head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-RRTKDYCN7V"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-RRTKDYCN7V');
      </script>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post) => (
            <PostCard key={post.title} post={post.node} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export async function getStaticProps() {
  const posts = (await getPosts()) || [];
  return {
    props: {
      posts,
    },
  };
}
