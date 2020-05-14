/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   init_stack.c                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: secho <secho@student.42seoul.kr>           +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/04/23 20:22:40 by secho             #+#    #+#             */
/*   Updated: 2020/04/23 20:39:16 by secho            ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "stack.h"

t_stack		*init_stack(void)
{
	t_stack *new;

	if (!(new = malloc(sizeof(t_stack))))
		return (NULL);
	new->top = NULL;//create_node(0);
	new->size = 0;
	return (new);
}
