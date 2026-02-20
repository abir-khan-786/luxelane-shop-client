import Categories from '@/src/components/home/Categories';
import LuxeHero from '@/src/components/home/LuxeHero';
import Products from '@/src/components/home/Products';
import Features from '@/src/components/home/Features';
import BrandStory from '@/src/components/home/BrandStory';
import Reviews from '@/src/components/home/Reviews';

const HomePage = () => {
    return (
        <div>
            <LuxeHero />
            <Categories />
            <Products />
            <Features />
            <BrandStory />
            <Reviews />
        </div>
    );
};

export default HomePage;