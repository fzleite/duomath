import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { ExercisePlayer } from './screens/ExercisePlayer'
import { ModuleHub } from './screens/ModuleHub'
import { ParentDashboard } from './screens/ParentDashboard'
import { ProfileSelect } from './screens/ProfileSelect'
import { StageList } from './screens/StageList'
import { useApp } from './state/store'

/** Sem perfil ativo nao ha o que medir: toda tela de crianca passa por aqui. */
function RequireProfile({ children }: { children: React.ReactNode }) {
  const activeProfileId = useApp((s) => s.activeProfileId)
  return activeProfileId ? <>{children}</> : <Navigate to="/perfis" replace />
}

export default function App() {
  const ready = useApp((s) => s.ready)
  const init = useApp((s) => s.init)

  useEffect(() => {
    void init()
  }, [init])

  if (!ready) return <main className="screen screen-center">Carregando…</main>

  return (
    // basename vem do base do Vite: no GitHub Pages o app vive em /duomath/, nao na raiz
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/perfis" element={<ProfileSelect />} />
        <Route path="/responsavel" element={<ParentDashboard />} />
        <Route
          path="/"
          element={
            <RequireProfile>
              <ModuleHub />
            </RequireProfile>
          }
        />
        <Route
          path="/modulo/:moduleId"
          element={
            <RequireProfile>
              <StageList />
            </RequireProfile>
          }
        />
        <Route
          path="/modulo/:moduleId/:stageId"
          element={
            <RequireProfile>
              <ExercisePlayer />
            </RequireProfile>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
