// paths = array med object och varje objet ska ha property params

// Bestämmer alla paths alltså behöver alla id:en.
export async function getStaticPaths() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
    const posts = await response.json();
  
    const paths = posts.map((post) => ({
      params: { id: post.id.toString() },
    }));
  
    return {
      paths,
      fallback: false,
    };
  }
  
  // Hämta data för varje id och returnera props
  export async function getStaticProps({ params }) {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${params.id}`
    );
    const post = await response.json();
  
    return {
      props: {
        post,
      },
    };
  }
  
  export default function Post({ post }) {
    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    );
  }