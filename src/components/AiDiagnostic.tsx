import React, { useState } from 'react';
import { Sparkles, Send, Upload, Wrench, ShieldAlert, Clock, DollarSign, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AiDiagnosticProps {
  onSelectRecommendedService: (serviceName: string) => void;
  onNavigateToSchedule: () => void;
}

export const AiDiagnostic: React.FC<AiDiagnosticProps> = ({
  onSelectRecommendedService,
  onNavigateToSchedule,
}) => {
  const [description, setDescription] = useState('');
  const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoDataUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDiagnose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() && !photoDataUrl) {
      setErrorMsg('Please describe your issue or upload a photo.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setResult(null);

    try {
      const res = await fetch('/api/ai-diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problemDescription: description,
          photoDataUrl
        })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setResult(data.data);
      } else {
        setErrorMsg('Could not process diagnosis. Please try again or browse our service catalog.');
      }
    } catch {
      setErrorMsg('Diagnostic service error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-12 bg-[#FBF9F6] text-[#332D29] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A67C52]/10 border border-[#A67C52]/30 text-[#A67C52] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#A67C52]" />
            <span>AI Repair Diagnostic Technician</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D3A3A] tracking-tight">
            Not sure what needs fixing? Ask AI!
          </h2>
          <p className="text-[#6B655E] text-sm max-w-xl mx-auto">
            Describe your repair problem or upload a photo. Our AI technician will diagnose the issue, estimate repair hours & cost, and suggest exact services.
          </p>
        </div>

        {/* Diagnostic Input Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E1D6] space-y-6 shadow-sm">
          <form onSubmit={handleDiagnose} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#A67C52] uppercase tracking-wider">
                Describe the problem or repair request:
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. My bathroom ceiling has a 4-inch crack with brown water stains, or I need an 85-inch OLED TV mounted on a metal stud wall..."
                className="w-full bg-[#FBF9F6] border border-[#E6E1D6] rounded-2xl p-4 text-[#332D29] placeholder-[#8C857B] text-sm focus:outline-none focus:ring-2 focus:ring-[#A67C52]"
              />
            </div>

            {/* Photo attachment option */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#E6E1D6]">
              <div className="flex items-center gap-3">
                <label className="bg-[#EFECE6] hover:bg-[#E6E1D6] border border-[#E6E1D6] px-4 py-2.5 rounded-xl text-xs font-semibold text-[#332D29] flex items-center gap-2 cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 text-[#A67C52]" />
                  <span>Attach Image / Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>

                {photoDataUrl && (
                  <span className="text-xs text-[#5A6D5D] flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-4 h-4" /> Photo Loaded
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="bg-[#A67C52] hover:bg-[#8B5E3C] text-white font-extrabold px-6 py-3 rounded-full text-xs flex items-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                {isLoading ? (
                  <span>Analyzing Issue...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run AI Diagnosis</span>
                  </>
                )}
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs">
                {errorMsg}
              </div>
            )}
          </form>

          {photoDataUrl && (
            <div className="w-32 h-32 rounded-xl overflow-hidden border border-[#E6E1D6]">
              <img src={photoDataUrl} alt="Problem area" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Results Card */}
        {result && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E6E1D6] space-y-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E6E1D6] pb-4">
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#A67C52]" />
                <h3 className="text-xl font-bold text-[#2D3A3A]">Diagnostic Assessment</h3>
              </div>
              <span className="bg-[#5A6D5D]/10 text-[#5A6D5D] text-xs font-bold px-2.5 py-1 rounded-full border border-[#5A6D5D]/30">
                AI Confidence: Math Verified
              </span>
            </div>

            {/* Issue Explanation */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#A67C52] uppercase tracking-wider">Technical Analysis:</h4>
              <p className="text-[#332D29] text-sm leading-relaxed bg-[#FBF9F6] p-4 rounded-2xl border border-[#E6E1D6]">
                {result.diagnosis}
              </p>
            </div>

            {/* Cost & Hours Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#FBF9F6] p-4 rounded-2xl border border-[#E6E1D6] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#5A6D5D]/10 text-[#5A6D5D] flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#6B655E] block">Estimated Repair Cost:</span>
                  <span className="text-lg font-bold text-[#5A6D5D]">
                    ${result.estimatedCostMin} - ${result.estimatedCostMax}
                  </span>
                </div>
              </div>

              <div className="bg-[#FBF9F6] p-4 rounded-2xl border border-[#E6E1D6] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#A67C52]/10 text-[#A67C52] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#6B655E] block">Estimated Job Duration:</span>
                  <span className="text-lg font-bold text-[#2D3A3A]">{result.estimatedHours}</span>
                </div>
              </div>
            </div>

            {/* Recommended Services */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#A67C52] uppercase tracking-wider">Recommended Services to Book:</h4>
              <div className="flex flex-wrap gap-2">
                {result.recommendedServices?.map((srv: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectRecommendedService(srv);
                    }}
                    className="bg-[#FBF9F6] hover:bg-[#EFECE6] text-[#A67C52] border border-[#A67C52]/40 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#5A6D5D]" />
                    <span>{srv}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Safety Tips */}
            {result.safetyTips && (
              <div className="bg-[#A67C52]/10 border border-[#A67C52]/30 p-4 rounded-2xl text-xs text-[#332D29] flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-[#A67C52] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-[#2D3A3A]">Safety & DIY Advice:</strong>
                  {result.safetyTips}
                </div>
              </div>
            )}

            {/* Action */}
            <div className="pt-4 border-t border-[#E6E1D6] text-right">
              <button
                onClick={onNavigateToSchedule}
                className="bg-[#A67C52] hover:bg-[#8B5E3C] text-white font-extrabold px-6 py-3 rounded-full text-xs inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Book This Repair Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
