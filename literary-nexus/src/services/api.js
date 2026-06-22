export const fetchEventData = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  if (!response.ok) throw new Error('Failed to fetch event data');
  const data = await response.json();
  return {
    eventName: 'The Literary Nexus 2026',
    eventDate: '2026-09-15T10:00:00',
    venueName: 'The Grand Literary Hall',
    venueAddress: '42 Bookworm Boulevard',
    venueCity: 'Manhattan, New York',
  };
};

export const fetchAuthors = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) throw new Error('Failed to fetch authors');
  const users = await response.json();
  return users.map((user) => ({
    id: user.id,
    name: user.name,
    bio: `Award-winning author and literary critic. ${user.company?.catchPhrase || ''}`,
    photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=8b5cf6&color=fff&size=200`,
  }));
};
