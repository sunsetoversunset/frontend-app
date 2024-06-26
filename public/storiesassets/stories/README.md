# Sunset Over Sunset Stories

## Content

The stories are stored as markdown files in /public/storiesassets/stories/<filename>.md. For the most part those files are just vanilla markdown with blank spaces between paragraphs, conventional links for addresses, more-or-less conventional images.

Standard markdown elements that are used are:

### Internal Headers

`### <header>`

e.g.:

`### Visual Real Estate`


### Paragraphs

`While palms have populated ...`

No syntax, just text separated by two line breaks.

### Bold (e.g. the opening paragraphs)

`**<text>**`

e.g.:

`**The lens of Ruscha’s incessant and indiscriminate camera ...** `


### Italics 

Markdown has two options

`*<italicized text>*`

`_<italicized text>_`

### Links

`[<text>](<href>)`

e.g.:

`[5751 Sunset Blvd](/address/5751)`

### Images

Single images that are centered in the story have standard markdown syntax. The optional title is used for the caption.

`[<alt text>](<src> <title>)`

e.g.:

`![8101 Sunset Boulevard. 1966](https://media.getty.edu/iiif/image/3e423f15-c7f0-463c-b3dd-77ae8d581a8b/full/,1000/0/default.jpg "View along North Kingsley Drive, looking north, from Sunset Blvd, 1973")`

[Note: single images should have NO asterisk before ! and include 1000 not 400 as the stated width.]

**Photo strips** are laid out using a combination of the standard image syntax and the standard list syntax, after all they are a list of images. Include a title only for the first image, which will be used as the caption. To separate two lists that occur consecutively, add a comment between them `<!-- --->`. It's probably just a good idea to put that in front of every photo strip.

````
<!-- -->
* [<alt text>](<src> <title>)
* [<alt text>](<src>)
* [<alt text>](<src>)
````

e.g.:


````
<!-- -->
* ![8101 Sunset Boulevard. 1966](https://media.getty.edu/iiif/image/5deb7e9f-cc95-4cbd-9e94-29d154d01da2/full/,400/0/default.jpg "8101 Sunset Boulevard. From left: 1966, 1985, 2007")
* ![8101 Sunset Boulevard. 1985](https://media.getty.edu/iiif/image/57797332-eb53-4483-b31c-95ec1f47ced3/full/,400/0/default.jpg)
* ![8101 Sunset Boulevard. 2007](https://media.getty.edu/iiif/image/9c0f8a45-41ba-4832-b9a0-e1e79bca457c/full/,400/0/default.jpg)
````

**Note: don't use parentheses (or brackets) in the caption. The close parenthesis closes the source.**

This also will work with single images if you want those to take up the full width of the window--just a list with one image.

The title can itself be markdown and include links, *but those links have to use an alternate syntax for links called reference syntax*. (The reason is the closing parenthesis closes the whole src.)

```[<text>][<reference>] [reference]: <url>```

The reference can be anything, it just needs to match. Here's an example using of an image with a linked caption:

`![8101 Sunset Boulevard. 1966](https://media.getty.edu/iiif/image/3e423f15-c7f0-463c-b3dd-77ae8d581a8b/full/,1000/0/default.jpg "[View along North Kingsley Drive, looking north, from Sunset Blvd, 1973][url] [url]: /n/8101")`

If the title doesn't begin with a '[', signalling it's a markdown link, and the title begins with a number, that's automatically linked to the address page. That means you can't begin a caption with a number if it's not an address. I'd spell it out.

### Footnotes

The reference is:

`[^<number>]`

e.g.:

`[^8]`

The content is

`[^<number>]: <content>`

e.g.:

`[^8]: “O Council, Plant Those Trees,” _Los Angeles Times_, November 2, 1957.`

### Callouts

This co-ops the markdown syntax—three backticks—for code blocks.

` ``` `

```
<callout>
```

`` ``` ``

e.g.:

`` ``` ``

```
In their arrival and disappearance, palms demonstrate the fragility and ongoing maintenance that urban nature requires.
```

`` ``` ``

## Story metadata

The title, author, header image, image positioning, and date for each story is stored in the `/public/storiesassets/stories.json` file using the following format. The published is there so a story can be built and put on the web without appearing on the stories page.

```typescript
export type StoryMetadata = {
  slug: string;
  title: string;
  author: string;
  img_id: string;
  background_position?: string;
  date: {
    year: number;
    month: number;
    day: number;
  };
  published: boolean;
};
```

e.g.:

```typescript
{
  "slug": "palmtrees",
  "title": "Palm Trees",
  "img_id": "dee6908d-40e5-4bcf-a8e6-e29eac9eb2ac",
  "background_position": "bottom",
  "author": "Francesca Ammon",
  "date": {
    "year": 2023,
    "month": 6,
    "day": 17
  },
  "published": false
}
```

The background position is optional. You can use percentages if you want to be quite precise, but it's probably a good idea to use the descriptive values: `left`, `right`, and `center` for horizontal position and `top`, `bottom`, and `center` for vertical.

You list those horizontal, then vertical, e.g. `right top`. If you only list one, the other value will be `center`.

`center center` is the default.
