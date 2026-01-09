import groq from "groq";

export const homePageQuery = groq`
    *[_type == 'home' && _id == 'home'][0]{
        ...,
        heroRightBlogs[] -> {
         ...,
            heroImage{
               ...,    
              asset -> 
          },
          author ->,
          category -> 
        },
        categoryGroup[]{
            ...,
            categories[] ->,
        },
        newsBlogs[] -> {
          ...,
          heroImage{
            ...,    
            asset -> 
          },
          author ->,
         category -> 
        },
        newsBackgroundImage{
            ...,
            asset ->,
        }
    }
`;

export const blogsByCategoryQuery = groq`
    *[_type == 'blog' && category->slug.current == $categorySlug]{
        ...,
        heroImage{
            ...,    
            asset -> 
        },
        author ->,
        category -> 
    }
`;

export const blogBySlugQuery = groq`
    *[_type == 'blog' && category->slug.current == $categorySlug && slug.current == $blogSlug]{
        ...,
        heroImage{
            ...,    
            asset -> 
        },
        author ->,
        category -> 
    }
`;

export const blogCategoryBySlugQuery = groq`
    *[_type == 'blogCategory' && slug.current == $categorySlug][0]{
        ...,
    }
`;

export const claculatorCategoriesQuery = groq`
    *[_type == 'calculatorCategory']{
        _id,
        title,
        tagLine,
        slug,
    }
`;

export const calculatorQuery = groq`
    *[_type == 'calculator']{
        ...,
        icon {
            ...,
            asset ->
        },
        category ->
    }
`;

export const settingsQuery = groq`
    *[_id == 'settings' && _type == 'settings'][0]{
        ...,
        headerLogo {
            ...,
            asset ->{
                ...
            },
        },
        footerLogo{
            ...,
            asset ->{
                ...
            },
        }
    }
`;

export const blogCategoriesQuery = groq`
    *[_type == 'blogCategory']{
        ...,
    }
`;

export const blogAuthorsQuery = groq`
    *[_id == 'blogAuthor' && _type == 'blogAuthor']{
        ...,
    }
`;

export const blogCategoryPageQuery = groq`
    *[_type == 'blogCategoryPage'][0]{
        ...,
        recommandedBlogs[] -> {
            ...,
            heroImage{
            ...,    
            asset -> 
            },
            author ->,
            category -> 
        },
        otherCategories[] -> {
            ...,
            'blogCount': count(*[_type == 'blog' && references(^._id)])
        }
    }
`;

export const blogsQuery = groq`
    *[ _type == 'blog']{
        ...,
        heroImage{
            ...,    
            asset -> 
        },
        author ->,
        category -> 
    }
`;
