import { Database } from 'lucide-react';

export function PageHeader() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-foreground via-foreground/95 to-primary text-primary-foreground">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-30" />
      
      <div className="relative container mx-auto px-6 py-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-xl backdrop-blur-sm border border-primary-foreground/10">
            <img src='https://i.ibb.co/8JSnQ4D/proc-logo.png' className='w-20 h-15'></img>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              ProcUnify
            </h1>
            <p className="text-primary-foreground/70 mt-1">
              From Fragmented to Unified: Smarter Patient Identification
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
