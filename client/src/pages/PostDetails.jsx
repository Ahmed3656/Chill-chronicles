import React from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom'

import img from '../images/blog15.jpg'

const PostDetails = () => {
  return (
    <section className="post-details">
      <div className="container post-details-container">
        <div className="post-details-header">
          <PostAuthor />
          <div className="post-details-buttons">
            <Link to={`/posts/id/edit`} className='meBtn meBtn-sm meBtn-primary'>Edit</Link>
            <Link to={`/posts/id/delete`} className='meBtn meBtn-sm meBtn-danger'>Delete</Link>
          </div>
        </div>
        <h1>The post title</h1>
        <div className="post-details-thumbnail">
          <img src={img} alt='' />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis tenetur officia impedit ipsa. Doloremque dicta at praesentium minima illo animi tempore sed quam odit adipisci. Nobis aspernatur exercitationem soluta nulla dicta animi nihil quidem, dolorem, unde quisquam doloribus placeat ducimus!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id, illo? Aut maiores animi provident sit minus vero mollitia maxime sint! Fuga eius fugiat quae, facilis deserunt dignissimos dolores nulla ipsum tenetur distinctio sit repudiandae corporis quia officia. Non labore quod recusandae similique magnam explicabo, voluptatum ducimus eos blanditiis repellat quis rerum quos consequatur ab ipsum?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, harum assumenda magnam et, dolor repellat voluptate possimus cumque culpa voluptatibus aperiam delectus iusto accusamus consequatur corrupti illum quos unde ipsum totam voluptates qui ut, iure cum. Nisi dignissimos nobis eum! Officia mollitia dolorum at eaque incidunt, nulla maiores, hic magni sint ipsa quibusdam repellendus cumque, enim eos dolorem. Ipsam corporis libero voluptas deserunt aliquid natus corrupti, cum suscipit facilis iste sequi aliquam pariatur officiis velit illum et architecto placeat. Ad, provident aliquam voluptas tempora nulla voluptates nam vero eum omnis atque! Quaerat amet rem consequatur, magni assumenda quod vero sit perferendis dignissimos atque dolorum similique beatae iure corrupti. Expedita, in deserunt.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore numquam enim tempora pariatur ea consequatur eius facilis reiciendis tenetur mollitia!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae ab assumenda corrupti nulla odio aperiam facere deserunt, modi omnis debitis illo, quas beatae, quod quos ratione. Earum harum eaque corrupti ratione temporibus ab architecto aut itaque esse sunt voluptas soluta, in, accusantium, totam voluptate. Sunt animi ad quas maiores, itaque eos minima molestias blanditiis a, quis minus cumque culpa aut illo veniam hic totam reiciendis aperiam quae dicta id omnis excepturi. Ducimus doloremque ea quis officiis? Sunt eaque consequatur deserunt explicabo, vero quasi nemo quisquam omnis cum cumque aperiam laborum atque non velit dicta pariatur repellat. Sit, perferendis consectetur unde dignissimos nobis blanditiis, dolorum recusandae at dolor pariatur vitae nostrum? Dolorem accusamus unde quod eaque praesentium dolore eum eligendi natus necessitatibus minus eveniet accusantium, quibusdam, neque nulla officiis officia error cupiditate obcaecati inventore asperiores ab. Praesentium ipsum architecto officiis provident alias quod fugit magnam nemo. Deserunt, possimus ab adipisci excepturi voluptatem earum inventore. Non, obcaecati dolore iste aperiam voluptatum odit, excepturi tempore, et veritatis ipsa deserunt? Minima itaque consectetur expedita quis, rerum fuga temporibus. Omnis magnam harum eaque. Ducimus, non. Harum dolores vel quas, repellendus earum veniam porro laudantium ratione iure, cupiditate recusandae, officia saepe itaque animi accusamus voluptates cum.
        </p>
      </div>
    </section>
  )
}

export default PostDetails