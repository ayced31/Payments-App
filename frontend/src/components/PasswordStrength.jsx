import { getPasswordStrength } from "../utils/validation";

const PasswordStrength = ({ password }) => {
  const { strength, label, color, feedback } = getPasswordStrength(password);

  if (!password) return null;

  const strengthColors = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
  };

  const textColors = {
    red: "text-red-600",
    orange: "text-orange-600",
    yellow: "text-yellow-600",
    green: "text-green-600",
  };

  return (
    <div className="mt-2">
      {/* Strength bar */}
      <div className="flex space-x-1 mb-2">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              level <= strength ? strengthColors[color] : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {/* Strength label */}
      <div className={`text-sm font-medium ${textColors[color]}`}>
        Password strength: {label}
      </div>

      {/* Feedback */}
      {feedback.length > 0 && (
        <div className="mt-1">
          <ul className="text-xs text-gray-600 space-y-1">
            {feedback.slice(0, 2).map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="text-gray-400 mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordStrength;
