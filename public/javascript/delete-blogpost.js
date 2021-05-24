

async function deletePost(event) {
    console.log(event)
    event.preventDefault();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
      const res = await fetch(`/api/posts/${post_id}`, {
          method: 'DELETE'
      });
      if(res.ok){
          document.location.replace('/dashboard');
      } else {
          alert(res.statusText)
      }
}

document.querySelector('.delete-post-btn').addEventListener('click', deletePost)