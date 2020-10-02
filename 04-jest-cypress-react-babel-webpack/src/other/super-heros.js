const superHeros = [{powers: 'fly x'}, {powers: 'fly y'}]

function getFlyingSuperHeros() {
  return superHeros.filter(hero => {
    return hero.powers.includes('fly')
  })
}

export {getFlyingSuperHeros}
