import groq from "groq";

export const categoriesQuery = `
    *[_type == 'calculatorCategory']{
        _id,
        title,
        tagLine,
        slug
    }
`;
export const calculatorQuery = `
    *[_type == 'calculator']{
        ...,
        icon {
            ...,
            asset ->
        },
        category ->
    }
`;
export const settingsQuery = `
    *[_type == 'settings']{
        ...,
        headerLogo {
            ...,
            asset ->
        },
        footerLogo{
            ...,
            asset ->
        }
    }
`;
