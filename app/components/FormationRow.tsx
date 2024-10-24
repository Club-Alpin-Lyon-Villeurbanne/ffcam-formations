import { useState } from "react";
import { Formation } from "@/app/types/formation";
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FormationRowProps {
  formation: Formation;
}

export default function FormationRow({ formation }: FormationRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const formatDate = (dateString: string) => format(new Date(dateString), "dd/MM/yyyy");

  return (
    <li className="border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-white overflow-hidden">
      <div className="flex items-center p-4 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex-grow grid grid-cols-1 md:grid-cols-7 gap-4">
          <div className="col-span-2 font-semibold text-primary">
            <div className="md:hidden text-xs text-gray-500 mb-1">Formation</div>
            {formation.titre}
            <div className="md:hidden mt-1 text-sm text-gray-600">
              {formation.organisateur}
            </div>
          </div>
          <div>
            <div className="md:hidden text-xs text-gray-500 mb-1">Lieu</div>
            {formation.lieu}
          </div>
          <div>
            <div className="md:hidden text-xs text-gray-500 mb-1">Date</div>
            {formation.dates[0] && formatDate(formation.dates[0])}
          </div>
          <div>
            <div className="md:hidden text-xs text-gray-500 mb-1">Prix</div>
            {formation.tarif}€
          </div>
          <div>
            <div className="md:hidden text-xs text-gray-500 mb-1">Places</div>
            {formation.placesRestantes !== null ? formation.placesRestantes : "Inconnu"}
          </div>
          <div>
            <div className="md:hidden text-xs text-gray-500 mb-1">Discipline</div>
            {formation.discipline}
          </div>
        </div>
        <div className="ml-4">
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 border-t bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="mb-2">
                <strong>Organisateur :</strong> {formation.organisateur}
              </p>
              <p className="mb-2">
                <strong>Email :</strong>{" "}
                {showEmail ? (
                  formation.emailContact ? (
                    <a href={`mailto:${formation.emailContact}`} className="text-primary underline">
                      {formation.emailContact}
                    </a>
                  ) : (
                    "Non disponible"
                  )
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowEmail(true);
                    }}
                    className="text-primary underline"
                  >
                    Afficher l&apos;email
                  </button>
                )}
              </p>
            </div>
            <div>
              <p className="mb-2">
                <strong>Toutes les dates :</strong> {formation.dates.map(formatDate).join(", ")}
              </p>
            </div>
          </div>

          {formation.documents && formation.documents.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-semibold mb-2">Documents</h4>
              <ul className="space-y-2">
                {formation.documents.map((doc, index) => (
                  <li key={index}>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {doc.nom}
                      <span className="text-sm text-gray-500 ml-2">({doc.type})</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </li>
  );
}