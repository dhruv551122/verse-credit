import groq from "groq";

export const homePageQuery = groq`
    *[_type == 'home' && _id == 'home'][0]{
        ...,
        heroRightBlogs[] -> {
         ...,
          author ->,
          category -> 
        },
        categoryGroup[]{
            ...,
            categories[] ->,
        },
        newsBlogs[] -> {
          ...,
          author ->,
          category -> 
        },
    }
`;

export const blogsByCategoryQuery = groq`
    *[_type == 'blog' && category->slug.current == $categorySlug]{
        ...,
        author ->,
        category -> 
    }
`;

export const blogBySlugQuery = groq`
    *[_type == 'blog' && slug.current == $blogSlug][0]{
        ...,
        author ->,
        category -> 
    }
`;

export const blogCategoryBySlugQuery = groq`
    *[_type == 'blogCategory' && slug.current == $categorySlug][0]{
        ...,
    }
`;

export const calculatorsQuery = groq`
*[_type == 'calculator']{
    ...,
}
`;

export const calculatorPageQuery = groq`
*[_type == 'calculatorPage'][0]{
    ...,
    "calculatorList": *[_type == 'calculator']{
        _id,
        icon,
        title,
        description,
        slug,
    }
}
`;
export const calculatorBySlugQuery = groq`
    *[_type == 'calculator' && slug.current == $calculatorSlug][0]{
        ...,
    }
`;

export const settingsQuery = groq`
    *[_id == 'settings' && _type == 'settings'][0]{
        ...,
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
            author ->,
            category -> 
        },
        "category": *[_type == 'blogCategory' && slug.current == $categorySlug][0]{...,},
        "blogList": *[_type == 'blog' && category->slug.current == $categorySlug]{
            ...,
            category->,
            author->,
        },
        "otherCategories": *[ _type == 'blogCategory' && slug.current != $categorySlug]{
            ...,
            'blogCount': count(*[_type == 'blog' && references(^._id)])
        }
    }
`;

export const blogsByTitleSlug = groq`
    *[_type == 'blog' && title match $titleSlug + '*'] | order(_score desc){
        _id,
        title,
        author->,
        category->,
        slug,
        heroImage,
        uploadedAt,
        _updatedAt,
        _score
    } 
`;

export const blogsQuery = groq`
    *[ _type == 'blog'] | order(coalesce(uploadedAt, _createdAt) desc){
        ...,
        author ->,
        category -> 
    }
`;

export const blogsRssQuery = groq`
    *[_type == 'blog'] | order(orderrank){
        title,
        description,
        uplodedAt,
        slug,
        _createdAt,
        category -> ,
        heroImage,
    }
`;

export const contactPageQuery = groq`
    *[_type == 'contact_us' && _id == 'contact_us'][0]{
        ...,
    }
`;

export const siteMapQuery = groq`
    *[_type == 'blogCategory']{
        _id,
        "title": label,
        "slug": slug.current,
        "blogs": *[_type == "blog" && references(^._id)]{
            title,
            "slug": slug.current,
            "categorySlug": category->slug.current,
            _updatedAt
        }
    }
`;
