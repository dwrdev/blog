const postsContainer = document.querySelector('.postsContainer');
const postForm = document.querySelector('#postForm');

let postIdGen = 3;

const posts = [
  {
    title: 'First post',
    content: {
      paragraph1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ornare est vitae iaculis gravida. Morbi ac ex a libero luctus rutrum ut a tortor.',
      paragraph2: 'Nulla consequat est a lectus dictum commodo. Fusce tincidunt posuere quam. In vitae massa pellentesque, fringilla nisl auctor, pharetra nisl. Praesent in dolor pellentesque quam dictum auctor. Suspendisse vehicula quam vel sodales lacinia.',
      paragraph3: 'Vivamus convallis, ipsum eget facilisis sollicitudin, velit turpis tristique elit, finibus condimentum metus orci eu justo.'
    },
    posted: false,
    id: 'post1'
  },
  {
    title: 'Second post',
    content: {
      paragraph1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ornare est vitae iaculis gravida. Morbi ac ex a libero luctus rutrum ut a tortor.',
      paragraph2: 'Nulla consequat est a lectus dictum commodo. Fusce tincidunt posuere quam. In vitae massa pellentesque, fringilla nisl auctor, pharetra nisl. Praesent in dolor pellentesque quam dictum auctor. Suspendisse vehicula quam vel sodales lacinia.',
      paragraph3: 'Vivamus convallis, ipsum eget facilisis sollicitudin, velit turpis tristique elit, finibus condimentum metus orci eu justo.'
    },
    posted: false,
    id: 'post2'
  }
]


function renderPosts () {
  const postings = posts.map(function(post) {

    // Prevent duplicates at re-render
    if (post.posted === true) {
      return false;
    }

    const div = document.createElement('div');
    div.id = post.id;
    div.className = 'post';
    postsContainer.appendChild(div);

    const editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.addEventListener('click', editPost);
    div.appendChild(editButton);

    const h2 = document.createElement('h2');
    h2.textContent = post.title;
    div.appendChild(h2);

    const article = post.content;
    for (let key in article) {
      if (!article.hasOwnProperty(key)) { continue; }
        const content = document.createElement('p');
        content.textContent = article[key];
        div.appendChild(content);
    }

    // Set
    post.posted = true;
  })
}

postForm.addEventListener('submit', function () {
  // Prevent page refresh when submitting the add post form
  post.preventDefault();
  const title = document.querySelector('#title').value;
  const content = document.querySelector('#content').value;
  const posted = false;
  const id = 'post' + postIdGen++;

  posts.push({title, content, posted, id});

  // Re-render posts when a new one is added
  renderPosts();
})



function editPost () {
  // I refuse to accept this silly solution
  if (this.parentNode.contentEditable === "false" || this.parentNode.contentEditable === "inherit") {
    this.parentNode.contentEditable = "true";
    this.textContent = "Done";
  } else {
    this.parentNode.contentEditable = "false";
    this.textContent = "Edit";
  }


  let objElem;

  for (i = 0; i < posts.length; i++) {
    if (this.parentNode.id === posts[i].id) {
      objElem = posts[i]
    }
  }

  this.parentNode.addEventListener('keydown', function () {
    objElem.title = this.childNodes[1].textContent;
    objElem.content = this.childNodes[2].textContent;
  })
}


renderPosts();
