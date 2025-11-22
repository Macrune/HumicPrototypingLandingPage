const slugify = require('slugify');
const db = require('../config/db.js');

const generateSlug = async (title, tableName) => {
    const baseSlug = slugify(title, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    const [rows] = await db.query(`SELECT slug FROM ${tableName} WHERE slug LIKE ?`, [`${baseSlug}%`]);

    if (rows.length === 0) {
        return baseSlug;
    }

    const usedNumbers = new Set();

    rows.forEach(row => {
        const slug = row.slug;
        if (slug === baseSlug) {
            usedNumbers.add(0);
        } else {
            const match = slug.match(new RegExp(`^${baseSlug}-(\\d+)$`));
            if (match) {
                usedNumbers.add(parseInt(match[1], 10));
            }
        }
    });

    while (usedNumbers.has(count)) {
        count++;
    }
    return count === 0 ? baseSlug : `${baseSlug}-${count}`;
}

module.exports = generateSlug;