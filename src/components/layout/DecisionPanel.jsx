import BuildPhase from '../phases/BuildPhase'
import EventPhase from '../phases/EventPhase'
import ManagePhase from '../phases/ManagePhase'

export default function DecisionPanel({ phase, currentNeed, currentEvent, actions, state }) {
  switch (phase) {
    case 'build':
      return <BuildPhase need={currentNeed} onSelectTool={actions.selectTool} stack={state.stack} />
    case 'event':
      return <EventPhase event={currentEvent} onAcknowledge={actions.acknowledgeEvent} />
    case 'manage':
      return (
        <ManagePhase
          stack={state.stack}
          budget={state.budget}
          morale={state.morale}
          jurisdiction={state.jurisdiction}
          continuity={state.continuity}
          surveillance={state.surveillance}
          actions={{
            migrateTool: actions.migrateTool,
            runBackup: actions.runBackup,
            auditData: actions.auditData,
            endQuarter: actions.endQuarter,
          }}
        />
      )
    default:
      return null
  }
}
