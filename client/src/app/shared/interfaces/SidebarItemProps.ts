export default interface SidebarItemProps {
  icon: string;
  label: string;
  link: string;
  subList: SidebarItemProps[] | undefined;
}
