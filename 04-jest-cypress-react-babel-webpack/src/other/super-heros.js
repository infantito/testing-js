const superHeros = [{powers: 'fly x'}, {powers: 'fly y'}, {powers: 'fly z'}]

function getFlyingSuperHeros() {
  return superHeros.filter(hero => {
    return hero.powers.includes('fly')
  })
}

export {getFlyingSuperHeros}
