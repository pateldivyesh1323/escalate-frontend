import { useQuery } from "@tanstack/react-query";
import { getSharedModules } from "@/queries/moduleQueries";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import LoadingSpinner from "../../assets/animation/LoadingSpinner";
import {
  Eye,
  Settings2,
  Clock,
  RefreshCcw,
  User,
  UserCircle,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SharedModules() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const {
    data: modules,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["shared-modules"],
    queryFn: getSharedModules,
    enabled: !!user,
  });

  const isShareExpired = (expiryDate?: string) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    toast.error("Failed to fetch modules");
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Training Modules
          </h1>
          <p className="text-slate-500">Modules assigned to your account</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            disabled={isFetching}
            className="h-10 w-10"
          >
            <RefreshCcw
              className={`size-4 ${isFetching ? "animate-spin" : ""}`}
            />
          </Button>
        </div>
      </div>

      {!modules || modules.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mx-auto">
              <Settings2 className="w-10 h-10 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                No modules yet
              </h3>
              <p className="text-slate-500 mt-1">
                No modules have been shared with your email
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {modules.map((module) => (
            <div
              key={module._id}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-semibold text-slate-900">
                      {module.title}
                    </h3>
                    {module.shareURL &&
                      isShareExpired(module.shareTokenExpiry) && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                          <Clock className="w-3 h-3" /> Link Expired
                        </span>
                      )}
                  </div>

                  <div className="flex items-center gap-3 mt-2 flex-wrap text-sm text-slate-500">
                    {module.topic && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        {module.topic}
                      </span>
                    )}
                    {module.userFields?.role && (
                      <span className="inline-flex items-center gap-1">
                        <UserCircle className="w-3.5 h-3.5" />
                        {module.userFields.role}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                    {module.createdBy &&
                      typeof module.createdBy === "object" &&
                      module.createdBy.name && (
                        <span className="inline-flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {module.createdBy.name}
                        </span>
                      )}
                    {module.createdAt && (
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(module.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/shared/${module._id}`)}
                    className="h-9"
                  >
                    <Eye className="w-4 h-4 mr-1.5" /> View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
