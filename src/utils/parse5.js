import parse5 from 'parse5'

export default class Parse5 {
    parse(htmlTempalte) {
        const DOM = parse5.parse(htmlTempalte);

        return DOM;
    }

    serialize(DOM) {
        // Serializes the <html> element content.
        const htmlTemplate = parse5.serialize(DOM);

        return htmlTemplate;
    }
}