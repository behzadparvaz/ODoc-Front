import dynamic from 'next/dynamic';
const FamilyMembersContainer = dynamic(() =>
  import('@containers/profile').then((mod) => mod.FamilyMembersContainer),
);

const FamilyMembersPage = () => {
  return <FamilyMembersContainer />;
};
export default FamilyMembersPage;
