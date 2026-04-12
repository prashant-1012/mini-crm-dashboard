import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/ui/PageWrapper';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-8xl font-black text-gray-200 dark:text-gray-800">
            404
          </p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
            Page not found
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
            The page you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default NotFoundPage;