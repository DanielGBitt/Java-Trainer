"use client";

interface PlayerAvatarProps {
  level: number;
  xp: number;
}

export function PlayerAvatar({ level, xp }: PlayerAvatarProps) {
  const xpForNextLevel = level * 100;
  const progress = Math.min((xp % 100), 100);

  return (
    <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
        {level}
      </div>
      <div className="flex-1">
        <p className="font-semibold">Nivel {level}</p>
        <div className="w-full h-2 bg-white/30 rounded-full mt-1">
          <div
            className="h-full bg-white rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs opacity-80 mt-0.5">
          {xp} XP / {xpForNextLevel} XP
        </p>
      </div>
    </div>
  );
}
