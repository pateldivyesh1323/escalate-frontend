import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSharedModuleById } from "@/queries/moduleQueries";
import { useAuth } from "@/context/AuthContext";
import LoadingSpinner from "../assets/animation/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function SharedModuleDetail() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: module, isLoading, error } = useQuery({
    queryKey: ["shared-module", moduleId],
    queryFn: () => getSharedModuleById(moduleId as string),
    enabled: !!moduleId && !!user,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !module) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Module Not Found</h2>
          <p className="text-slate-500">The module does not exist or you don't have access.</p>
          <div className="mt-4">
            <Button onClick={() => navigate('/modules')} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Modules
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/modules')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{module.title}</h1>
          <p className="text-slate-500">{module.topic}</p>
        </div>
      </div>

      <section className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold mb-3">Instructions</h2>
        <p className="text-slate-600 mb-4">{module.userFields?.problemStatement}</p>

        <div className="mt-4">
          <Button onClick={() => { /* starting attempt flow handled elsewhere */ }} className="bg-indigo-600 hover:bg-indigo-700">
            Start Test
          </Button>
        </div>
      </section>
    </div>
  );
}
