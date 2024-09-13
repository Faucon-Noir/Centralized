import { createContext, useContext, useState, ReactNode } from "react";

// Définir les types pour les données du contexte
interface TaskContextType {
    isTaskStarted: boolean;
    isTaskComplete: boolean;
    startTask: () => void;
    completeTask: () => void;
}

// Créer un contexte avec la valeur par défaut `null`
const TaskContext = createContext<TaskContextType | null>(null);

// Hook pour accéder au contexte plus facilement
export function useTask() {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTask doit être utilisé dans un TaskProvider");
    }
    return context;
}

// Créer un Provider pour gérer l'état global de la tâche
export function TaskProvider({ children }: { children: ReactNode }) {
    const [isTaskStarted, setIsTaskStarted] = useState(false);
    const [isTaskComplete, setIsTaskComplete] = useState(false);

    const startTask = () => setIsTaskStarted(true);
    const completeTask = () => setIsTaskComplete(true);

    // Fournir les valeurs au contexte
    return (
        <TaskContext.Provider
            value={{ isTaskStarted, isTaskComplete, startTask, completeTask }}
        >
            {children}
        </TaskContext.Provider>
    );
}