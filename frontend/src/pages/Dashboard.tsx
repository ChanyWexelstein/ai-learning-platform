import PromptForm from '../components/PromptForm';

function Dashboard() {
  const userId = '1'; // Replace with real user context/localStorage later

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Learning Dashboard</h1>
      <PromptForm userId={userId} />
    </div>
  );
}

export default Dashboard;
