import { getResponsiveConfigurations, setResponsiveConfigurations } from "../src";

describe('Test responsive configurations', () => {
    it('should set responsive configurations with default direction as min', () => {
        setResponsiveConfigurations({
            breakpoints: {
                sm: 580,
                md: 768,
                lg: 1024,
                xl: 1280,
                hd: 1920,
            }
        });

        let configurations = getResponsiveConfigurations();

        expect(configurations).toMatchObject({
            breakpoints: {
                sm: 580,
                md: 768,
                lg: 1024,
                xl: 1280,
                hd: 1920,
            },
            direction: 'min'
        });
    })
});