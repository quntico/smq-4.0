const fs = require('fs');

const files = [
    'IndustriesMenu.jsx',
    'SolutionsMenu.jsx',
    'MachineryMenu.jsx',
    'TechnologyMenu.jsx',
    'CompanyMenu.jsx'
];

files.forEach(file => {
    const path = './src/components/' + file;
    let content = fs.readFileSync(path, 'utf8');

    if (!content.includes('react-router-dom')) {
        content = content.replace("import React from 'react';", "import React from 'react';\nimport { Link } from 'react-router-dom';");
    }

    content = content.replace(/<a\b/g, '<Link');
    content = content.replace(/<\/a>/g, '</Link>');
    content = content.replace(/ href=/g, ' to=');
    content = content.replace(/to="#/g, 'to="/');
    content = content.replace(/href:\s*'#/g, "to: '/");
    // Also we need to fix the `item.href` in mappings.
    // If `SolutionsMenu` had `item.href`, we changed it to `item.to` ? Let's check.
    // We replaced `href: '#` with `to: '/`. So now objects have `to`.
    // The mapping uses `<a href={item.href}` -> `<Link to={item.to}`
    content = content.replace(/item\.href/g, 'item.to');

    fs.writeFileSync(path, content);
    console.log('Updated ' + file);
});
