type NavigateFunction = (path: string) => void;

class NavigationService {
  private navigate: NavigateFunction | null = null;

  setNavigate(navigateFn: NavigateFunction) {
    this.navigate = navigateFn;
  }

  navigateTo(path: string) {
    if (this.navigate) {
      this.navigate(path);
    } else {
      window.location.href = path;
    }
  }
}

export const navigationService = new NavigationService();

