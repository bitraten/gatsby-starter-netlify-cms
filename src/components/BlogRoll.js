import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div class="column is-7">
        {posts &&
          posts.map(({ node: post }) => (
            <div>
              <div className="section" key={post.id}>
                <article>
                  <header className="is-block">
                    <p className="title is-size-4">
                      <Link className="has-text-primary"
                        to={post.fields.slug}
                      >
                        {post.frontmatter.title}
                      </Link>
                    </p>
                    <p className="subtitle has-text-grey is-size-6">
                      {post.frontmatter.date}
                    </p>
                  </header>
                  <div className="content is-size-5">
                    {post.excerpt}
                  </div>
                </article>
                  <hr />
              </div>
            </div>
          ))}
      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "bit" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
