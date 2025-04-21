const fs = require('fs');
const path = require('path');

// Helper function to ensure directory exists
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// Helper function to read file content
function readFileContent(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        console.log(`Creating new file: ${filePath}`);
        return '';
    }
}

// Component templates
const templates = {
    Card: `
import { Box } from '@chakra-ui/react';
import React from 'react';

const Card = ({ variant, children, ...rest }) => {
    return (
        <Box p='20px' {...rest}>
            {children}
        </Box>
    );
};

export default Card;
    `,
    
    BarChart: `
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = ({ ...props }) => {
    return <ReactApexChart {...props} type='bar' />;
};

export default BarChart;
    `,

    LineChart: `
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = ({ ...props }) => {
    return <ReactApexChart {...props} type='line' />;
};

export default LineChart;
    `,

    PieChart: `
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({ ...props }) => {
    return <ReactApexChart {...props} type='pie' />;
};

export default PieChart;
    `,

    Separator: `
import { Divider } from '@chakra-ui/react';
import React from 'react';

export const VSeparator = (props) => {
    return <Divider orientation='vertical' {...props} />;
};

export default VSeparator;
    `,

    CustomIcon: `
import { Icon as ChakraIcon, IconProps } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { ElementType } from 'react';

interface CustomIconProps extends Omit<IconProps, 'as'> {
    as: IconType | ElementType;
}

export const Icon = ({ as: Component, ...props }: CustomIconProps) => {
    return <ChakraIcon as={Component as ElementType} {...props} />;
};

export default Icon;
    `
};

// File paths configuration
const componentPaths = {
    'components/card/Card.tsx': templates.Card,
    'components/charts/BarChart.tsx': templates.BarChart,
    'components/charts/LineChart.tsx': templates.LineChart,
    'components/charts/PieChart.tsx': templates.PieChart,
    'components/separator/Separator.tsx': templates.Separator,
    'components/icons/CustomIcon.tsx': templates.CustomIcon
};

// Main execution
function main() {
    const srcPath = path.join(process.cwd(), 'src');
    
    // Create and populate component files
    Object.entries(componentPaths).forEach(([componentPath, template]) => {
        const fullPath = path.join(srcPath, componentPath);
        ensureDirectoryExists(path.dirname(fullPath));
        
        // Only write if file doesn't exist or is empty
        const existingContent = readFileContent(fullPath);
        if (!existingContent || existingContent.trim() === '') {
            fs.writeFileSync(fullPath, template.trim());
            console.log(`Created/Updated: ${componentPath}`);
        }
    });

    // Fix imports in all TypeScript files
    function fixImportsInFile(filePath) {
        const content = readFileContent(filePath);
        let newContent = content;

        // Fix Icon imports
        if (content.includes('import { Icon }')) {
            newContent = newContent.replace(
                /import\s*{\s*Icon\s*}\s*from\s*['"]@chakra-ui\/react['"];?/g,
                `import { Icon } from 'components/icons/CustomIcon';`
            );
        }

        // Fix other component imports
        Object.keys(componentPaths).forEach(componentPath => {
            const componentName = path.basename(componentPath, '.tsx');
            const importRegex = new RegExp(`import\\s+{?\\s*${componentName}\\s*}?\\s+from`, 'g');
            if (importRegex.test(newContent)) {
                newContent = newContent.replace(
                    importRegex,
                    `import ${componentName} from`
                );
            }
        });

        if (newContent !== content) {
            fs.writeFileSync(filePath, newContent);
            console.log(`Fixed imports in: ${filePath}`);
        }
    }

    // Walk through all TypeScript files
    function walkDir(dir) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            if (fs.statSync(filePath).isDirectory()) {
                walkDir(filePath);
            } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                fixImportsInFile(filePath);
            }
        });
    }

    walkDir(srcPath);
    console.log('Completed fixing all files');
}

// Run the script
try {
    main();
} catch (err) {
    console.error('Error:', err);
}
