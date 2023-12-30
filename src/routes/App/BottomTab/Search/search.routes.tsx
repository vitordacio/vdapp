import { SearchProvider } from '@contexts/search';
import Search from '@screens/App/Search';
import { AppProps } from '@routes/App/app.routes';

const SearchRoutes: React.FC<AppProps> = ({ navigation, route }) => {
  return (
    <SearchProvider>
      <Search navigation={navigation} route={route} />
    </SearchProvider>
  );
};

export default SearchRoutes;
