interface Task {
  id: string;
  description: string;
}

interface Achievement {
  id: string;
  description: string;
  icon: string;
  checkComplete(taskStatus: Status): boolean;
}

interface Status {
  state: State;
  updated: boolean;
}

interface Challenge {
  id: string;
  state: State,
  tasksOrder: [],
  tasksStatus: Status,
  achievementsStatus: []
}

interface ArchiveItem extends Task {
  status: Status
}

type TaskForToday = ArchiveItem

interface ActualAchievement extends ArchiveItem {
  image: string;
}

enum State {
  Pending = 'Pending',
  Success = 'Success',
  Failure = 'Failure'
}